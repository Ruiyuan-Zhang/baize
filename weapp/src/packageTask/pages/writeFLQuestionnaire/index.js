import {View, Image, Button} from '@tarojs/components'
import { AtImagePicker, AtInput } from 'taro-ui'
import Taro from '@tarojs/taro'
import {useEffect, useState} from 'react'
import request from '@/utils/request'
import {file_url} from '@/config'
import Lines from './lines'
import Modal from './modal'
import styles from './index.module.less'

// 放在这里的话，就可以记录每一次在本界面进行的操作
let datas = {}

const Index = () =>{

    const {id,ret} = Taro.getCurrentInstance().router.params
    const [task,setTask] = useState({})
    const [dataFormat, setDataFormat] = useState([])
    useEffect(()=>{
        (async function(){
            if (!id) {
                Taro.showToast({title:'请传入任务编号', icon:'none'})
                return
            }
            
            let res = await request({url:`/v1/admin/task/detailWithFormat?id=${id}`,method:'get'})
            if (res instanceof Error)return
            setTask(res.data)

            let ds = res.data.dataFormats
            for (let i =0;i<ds.length;i++){
                ds[i].title = ds[i].tips
            }
            setDataFormat(ds)
        })()
    },[])

    // 控制保存之后的提示信息的展示
    const [modal, setModal]= useState(false)

    // 本界面的列表信息
    const [ids, setIDs] = useState([(new Date()).getTime() + '' + Math.floor(Math.random()*10000)])
    const addLine = ()=>{
        setIDs([
            ...ids,
            (new Date()).getTime() + '' + Math.floor(Math.random()*10000)
        ])
    }

    // 初始化当前界面的信息
    useEffect(()=>{
        datas={}
    },[])

    // 检查一下数据表格是否提交
    const checkAllInput = (ids,datas,dataFormat)=>{
        console.log(ids)
        console.log(datas)
        console.log(dataFormat)
        for (let i=0;i<ids.length;i++){

            // 判断一下这一组数据是不是写了？
            const id = ids[i]
            if (!datas[id])return false

            for (let j =0;j<dataFormat.length;j++){

                // 判断一下每个数据项是不是填写了
                if(!datas[id][dataFormat[j].englishName]){
                    return false
                }

                // 针对数组，判断一下数组的长度是不是正确
                if((datas[id][dataFormat[j].englishName] instanceof Array) && datas[id][dataFormat[j].englishName].length <= 0){
                    return false
                }
            }
        }
        return true
    }

    return (
        <View className={styles.index}>
            <Image className={styles.bgm} mode='widthFix' src={file_url+task.file}></Image>
            <View className={styles.info}>
            <View className={styles.name}>{task.name}</View>
            <View className={styles.desc}>{task.description}</View>
            </View>
            <View className={styles.datas}>
                {ids.map(id=>
                    <Lines key={id} id={id} dataFormat={dataFormat}
                      onChange={data=>{
                        datas[id]=data
                      }}
                    />
                )}
            </View>
            <Button className={styles.add} type='primary' onClick={addLine}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105021700.png'></Image>
                添加更多数据
            </Button>
            <View className={styles.info}>
                <View className={styles.name}>说明</View>
                <View className={styles.desc}>每组数据可获得6个白泽星奖励~</View>
                <View className={styles.desc}>至少上传两份数据才能用于本地模型训练哦~</View>
            </View>
            <View className={styles.bindex}>
                <Button className={styles.submit}
                onClick={async()=>{
                    // 检查是不是都写上了
                    if (!checkAllInput(ids,datas,dataFormat)){
                        Taro.showToast({
                            title:'您还有未填项',
                            icon:'none',
                        })
                        return
                    }
                    // 展示提示信息
                    setModal(true)
                }}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/save.png'></Image>
                    保存
                </Button>
            </View>
            {/* 这里解释一下，为啥在这里使用datas这样的变量，而不是状态值，因为在打开modal的时候，会重新渲染界面。 */}
            <Modal taskId={id} modal={modal} setModal={setModal} task={task} datas={datas} dataFormat={dataFormat}></Modal>
        </View>
    )
}

export default Index