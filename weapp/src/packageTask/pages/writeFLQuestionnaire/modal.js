import {View} from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import {AtModal, AtModalContent} from 'taro-ui'
import request from '@/utils/request'
import {saveUser, getUser, removeUser} from '@/common/user'

import insertData from './insertData'
import styles from './modal.module.less'

const Index = ({taskId, modal, setModal, task/*后面的这个task是在网络请求后的结果，并不能立即获取，所以不能使用这个对象来获取id*/,
    datas, dataFormat}) =>{
    
    // 判断当前用户是不是已经加入到这个任务中了
    const isHave = async()=>{
        const user = getUser()
        const userName = user.user_name
        const res = await request({url:`/v1/admin/task/taskUserHave`,method:'post',data:{
            userName,
            taskId
        }})
        if (res instanceof Error){
            return false
        }else{
            return true
        }
    }

    // 加入到任务中
    const joinTask = async () =>{
        let have = await isHave()
        if (!have){
            let user = getUser()
            let res = await request({url:`/v1/admin/task/taskUserAdd`,data:{
                taskId:task.idStr,
                taskName:task.name,
                userId:user.userId+'',
                userName:user.user_name,
            }})
            if (res instanceof Error) return 
        }
    }

    return(
        <View className={styles.modal}>
            <AtModal
              isOpened={modal}
              title='提示'
              cancelText='取消'
              confirmText='确认'
              content={`点击确定后将跳转到「我参与的任务」界面，您可以去完成本地数据训练。`}
              onCancel={()=>setModal(false)}
              onConfirm={async ()=>{
                // 加入到这个任务中
                await joinTask()
                // 保存数据到本地
                await insertData(task,Object.values(datas))
                // 界面跳转
                Taro.switchTab({
                    url:`/pages/task/index?id=${task.idStr}&ret=taskDetail`
                })
              }}
              onClose={()=>setModal(false)}
            />
        </View>
    )
}

export default Index