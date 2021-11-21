import { View, Image, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import { getLocalDataList } from '@/common/data'
import styles from './index.module.less'
import { useState } from 'react'

const Index = () =>{

    
    const {id,name} = Taro.getCurrentInstance().router.params
    const [data, setData] = useState([])  // 本地数据列表
    useDidShow(()=>{
        if (!id) {
            Taro.showToast({title:'请传入任务编号', icon:'none'})
            return
        }

        let list = getLocalDataList(id)
        setData(list)
        
    })

    return (
        <View className={styles.index}>
            <NavBar title='本地数据管理' />
            <View className={styles.title}>本地数据情况</View>
            <View className={styles.data}>
            <View className={styles.name}>{name}</View>
                <View className={styles.localDatas}>
                    {data.map(({image,value}, i)=>(
                        <View key={i} className={styles.localData}>
                            {image&&<Image src={image}></Image>}
                            <View>{value}</View>
                        </View>
                    ))}
                </View>
                <View className={styles.info}>
                    本地数据：{data&&data.length||0}份
                </View>
                <Button className={styles.addData}
                  onClick={()=>Taro.navigateTo({url:`/packageTask/pages/addLocalData/index?id=${id}`})}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105002538.png'></Image>
                    添加本地数据
                </Button>
                <Button className={styles.train}
                  onClick={()=>Taro.navigateTo({url:`/packageTask/pages/train/index?id=${id}`})}
                >
                    手动参与训练
                </Button>
            </View>

        </View>
    )
}

export default Index