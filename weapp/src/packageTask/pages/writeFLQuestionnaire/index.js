import {View, Image, Button} from '@tarojs/components'
import { AtImagePicker, AtInput, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import {useEffect, useState} from 'react'
import request from '@/utils/request'
import insertData from './insertData'
import styles from './index.module.less'

const Index = () =>{

    const [datas,setDatas] = useState([])

    const onChangeLocalData = ({dataIndex,index,value}) =>{
        console.log({dataIndex,index,value})
        let ds = [...datas]
        ds[dataIndex][index].value=value
        setDatas(ds)
    }

    // 再添加一条本地数据
    const addMoreData = () =>{
        setDatas([
            ...datas,
            [
                {title:'请输入含有手写数字的图片',type:'image',englishName:'image'},
                {title:'请输入图片中的数字',type:'int',englishName:'value'}
            ]
        ])
    } 

    // 每一组数据
    const Lines = ({dataIndex,lines}) =>{
        return (
            lines.map(({title,type},i)=>(
                <View key={i} className={styles.line}>
                    <View className={styles.title}
                      onClick={()=>{
                          console.log({dataIndex,i})
                        }}
                    >
                        {title}
                    </View>
                    {type=='image'
                    ?<AtImagePicker 
                        name={'images-'+dataIndex+'-'+i}
                        files={lines[i].value}
                        onChange={fs=>onChangeLocalData({
                            dataIndex,
                            index:i,
                            value:fs
                        })}
                    />
                    :<AtInput 
                        name={'input-'+dataIndex+'-'+i}
                        value={datas[dataIndex][i].value}
                        onChange={v=>onChangeLocalData({
                            dataIndex,
                            index:i,
                            value:v
                        })}
                    />}
                    
                </View>
            ))
        )
    }

    // 获取当前任务信息
    const [task,setTask] = useState({})
    useEffect(()=>{
        (async function(){
            const {id,ret} = Taro.getCurrentInstance().router.params
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
            setDatas([ds])
        })()
    },[])


    return (
        <View className={styles.index}>
            <Image className={styles.bgm} mode='widthFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105155522.png'></Image>
            <View className={styles.info}>
            <View className={styles.name}>{task.name}</View>
            <View className={styles.desc}>{task.description}</View>
            </View>
            <View className={styles.datas}>
                {
                    datas.map((lines,dataIndex)=>(
                        <View key={dataIndex} className={styles.data}>
                            {/* <AtIcon size='18' value='close' color='red' 
                              onClick={()=>{
                                delLocalData(dataIndex)
                              }}
                            /> */}
                            <Lines dataIndex={dataIndex} lines={lines} />
                        </View>
                    ))
                }
            </View>
            <Button className={styles.add} type='primary' onClick={addMoreData}>
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
                onClick={()=>{
                    insertData(task,datas)
                }}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106090222.png'></Image>
                    保存
                </Button>
            </View>
              
        </View>
    )
}

export default Index