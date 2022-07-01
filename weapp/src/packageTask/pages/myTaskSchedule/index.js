import { View, Image, Button } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import Taro, { useDidShow } from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import request from '@/utils/request'
import {saveUser, getUser, removeUser} from '@/common/user'
import styles from './index.module.less'
import { useState } from 'react'
import { AtSwitch } from 'taro-ui'


const Item = ({head, title,time,acc,banlance}) =>{
    return (
        <View className={styles.item}>
            {head?<Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211104215133.png'></Image>
            :<View className={styles.image}></View>}
            <View className={styles.title}>{title}</View>
            <View className={styles.content}>
                <View>训练时间：{time||'-'}ms</View>
                <View>准确率：{acc?acc*100:'-'}%</View>
                <View>收益：{banlance||'-'}白泽星</View>
            </View>
            <View className={styles.time}>时间：2021-10-04 09:30</View>
        </View>
    )
}

const Index = () =>{
    // 展示模型
    const [modal,setModal] = useState(false)

    // 查询全局模型的情况
    const {id} = Taro.getCurrentInstance().router.params
    const [globalModelList,setGlobalModelList] = useState([])
    useDidShow(async()=>{
        let res = await request({method:'get',url:'/v1/admin/model/global/listWithClients',data:{
            taskId:id, page:1, limit:100
        }})
        if (res instanceof Error) return
        console.log(res.list)
        setGlobalModelList(res.list.reverse())
    },[])

    // 判断当前轮次是不是当前用户
    const joinNums = (clients) =>{
        let num = 0
        let trainTimeSum = 0
        const user = getUser()
        console.log(user)
        for (let i=0;i<clients.length;i++){
            if (clients[i].userName == user.user_name){
                num += 1
                trainTimeSum = +clients[i].time + trainTimeSum
            }
        }
        return { num, trainTimeSum,}
    }

    return(
        <View className={styles.index}>
            <NavBar title='任务进展' />
            <View className={styles.title}>每轮训练情况</View>
            <View className={styles.train}>
                <View className={styles.title}>手写数字识别-浙江大学群体实验</View>
                <View className={styles.info}>每轮聚合参与情况（当前处于第4轮）</View>
                <View className={styles.items}>
                    <Item title={`正在进行：第${globalModelList.length+1}轮聚合`} head></Item>
                    {globalModelList.map(({id,acc,clients},index)=>{
                        const { num, trainTimeSum,} = joinNums(clients)
                        if (num > 0){
                            return <Item key={id} title={`第${globalModelList.length - index}轮聚合`} time={trainTimeSum} acc={acc} banlance={num*100}></Item>
                        }
                    })}
                </View>
                <Button>查看全局模型情况</Button>
            </View>
            <View className={styles.title}>设置</View>
            <View className={styles.setting}>
                <View className={styles.icon}>*</View>
                <AtSwitch title='长期运行'
                  checked={modal}
                  onChange={()=>{
                    setModal(true)
                  }}
                />
            </View>
            <AtModal
              isOpened={modal}
              title='提示'
              cancelText='取消'
              confirmText='确认'
              content='微信小程序端不支持长期后台训练，所以请您将训练代码和加密后的本地数据包放在电脑端执行。'
              onCancel={()=>setModal(false)}
              onConfirm={()=>{
                setModal(false)
                Taro.navigateTo({url:'/packageTask/pages/dataPack/index'})
              }}
              onClose={()=>setModal(false)}
            />
        </View>
    )
}

export default Index