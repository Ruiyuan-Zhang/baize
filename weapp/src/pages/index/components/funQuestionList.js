import {View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import QuestionaireItem from '@/components/QuestionaireItem'
import { useDidShow } from '@tarojs/taro'
import request from '@/utils/request'
import styles from './funQuestionList.module.less'
import { useState } from 'react'


const Index = () =>{
    const [questionaireItems, setQuestionaireItems] = useState([])
    useDidShow(()=>{
        (async function(){
        let res = await request({
            url: '/v1/admin/task/list?page=1&limit=10',
            method: 'get'
        })
        if (res instanceof Error) return
        console.log(res)
        setQuestionaireItems(res.list)
        // setList(res.list)
        })()
    },[])
    return(
        <View className={styles.fun}>
            <View className={styles.title}>
            <Image className={styles.titleIcon} mode='heightFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wenjuan_title@3x.png'></Image>
            <View className={styles.more}
                onClick={()=>{
                Taro.navigateTo({url:'/pages/questionnaireList/index'})
                
                }}
            >
                查看更多
                <Image className={styles.moreIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/more_icon@2x.png' ></Image>
            </View>
            </View>
            <View className={styles.qItems}>
            {questionaireItems.map(i=>(
                <View className={styles.item} key={i.id}>
                <QuestionaireItem {...i} type='fl'></QuestionaireItem>
                </View>
            ))}
            </View>
        </View>
    )
}

export default Index