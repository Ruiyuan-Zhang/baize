import { View, Input, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import QuestionaireItem from '@/components/QuestionaireItem'
import Tail from '@/components/Tail'
import Tabs from './components/Tabs'
import request from '@/utils/request'
import styles from './index.module.less'
import { useState } from 'react'

const Index = () =>{

  const [tab,setTab] = useState(1)

  // 联邦学习问卷
  const [fls, setFls] = useState([]) 
  useDidShow(()=>{
    (async function(){
      let res = await request({
        url: '/v1/admin/task/list?page=1&limit=100',
        method: 'get'
      })
      if (res instanceof Error) return
      setFls(res.list)
      console.log(res.list)
    })()
  },[])

  // 普通问卷
  const [os, setOs] = useState([])   
  useDidShow(()=>{
    (async function(){
      let res = await request({
        url: '/v1/admin/questionaire/list?page=1&limit=100',
        method: 'get'
      })
      if (res instanceof Error) return
      setOs(res.list)
      console.log(res.list)

    })()
  },[])

    return (
        <View className={styles.index}>
            <View className={styles.header}>
                <Image className={styles.back} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211012200140.png'
                  onClick={Taro.navigateBack}
                ></Image>
                <View className={styles.title}>更多问卷</View>
                <View className={styles.subTitle}>在这里发现更多有趣问卷......</View>

            </View>
            <View className={styles.content}>
              <Tabs value={tab} onChange={setTab}>
                {tab == 1? fls.map(i=>(
                    <View key={i.id} className={styles.item}>
                        <QuestionaireItem {...i} type='fl'></QuestionaireItem>
                    </View>
                )):os.map(i=>(
                    <View key={i.id} className={styles.item}>
                        <QuestionaireItem {...i} type='ord'></QuestionaireItem>
                    </View>
                ))}
              </Tabs>
              <Tail></Tail>
            </View>
        </View>
    )
}

export default Index