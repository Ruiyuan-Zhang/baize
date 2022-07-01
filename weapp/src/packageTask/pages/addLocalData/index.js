import { View, Button,Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import request from '@/utils/request'
import insertData from '../../utils/insertData'
import NavBar from '@/components/NavBar'
import Lines from '../../components/lines'
import styles from './index.module.less'
import { useEffect, useState } from 'react'

// 放在这里的话，就可以记录每一次在本界面进行的操作
let datas = {}

const Index = () =>{

    // 获取当前任务信息
    const {id} = Taro.getCurrentInstance().router.params
    const [task,setTask] = useState({})
    const [dataFormat, setDataFormat] = useState([])
    useEffect(()=>{
        (async function(){
            console.log(123)
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

    // 初始化当前界面的信息
    useEffect(()=>{
        datas={}
    },[])

    // 本界面的列表信息
    const [ids, setIDs] = useState([(new Date()).getTime() + '' + Math.floor(Math.random()*10000)])
    const addLine = ()=>{
        setIDs([
            ...ids,
            (new Date()).getTime() + '' + Math.floor(Math.random()*10000)
        ])
    }

    // 检查一下数据表格是否提交
    const checkAllInput = (ids,datas,dataFormat)=>{
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
            <NavBar title='添加本地数据' />
            <View className={styles.datas}>
                {ids.map(i=>
                    <Lines key={i} id={i} dataFormat={dataFormat}
                      onChange={data=>{
                        datas[i]=data
                      }}
                    />
                )}
            </View>
            <Button className={styles.add} type='primary' onClick={addLine}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105021700.png'></Image>
                添加更多数据
            </Button>
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
                    }else{
                        // 保存数据到本地
                        await insertData(task,Object.values(datas))
                        // 界面跳转
                        Taro.navigateBack()
                    }
                  }}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/save.png'></Image>
                    保存
                </Button>
            </View>
        </View>
    )
}

export default Index