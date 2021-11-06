import {View, Image, Button} from '@tarojs/components'
import { AtImagePicker, AtInput, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import {useState} from 'react'
import Submit from './components/Submit'
import styles from './index.module.less'

const Index = () =>{

    const [questions,setQuestions] = useState([
        {title:'请输入含有手写数字的图片',type:'image',englishName:'image'},
        {title:'请输入图片中的数字',type:'int',englishName:'value'}
    ])


    return (
        <View className={styles.index}>
            <Image className={styles.bgm} mode='widthFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105155522.png'></Image>
            <View className={styles.info}>
                <View className={styles.name}>手写数字识别</View>
                <View className={styles.desc}>通过训练模型，可以让机器学会识别手写数字～</View>
            </View>
            <View className={styles.questions}>
                {questions.map(({title,type},i)=>(
                    <View key={i} className={styles.line}>
                        <View className={styles.title}>
                            {title}
                        </View>
                        {type=='image'
                        ?<AtImagePicker 
                            name={'images-'+i}
                            files={[i].value}
                            onChange={fs=>{
                                let qs = [...questions]
                                qs[i].value = fs
                                setQuestions(qs)
                            }}
                        />
                        :<AtInput 
                            name={'input-'+i}
                            value={questions[i].value}
                            onChange={v=>{
                                let qs = [...questions]
                                qs[i].value = v
                                setQuestions(qs)
                            }}
                        />}
                        
                    </View>
                ))}
            </View>
            <View className={styles.info}>
                <View className={styles.name}>说明</View>
                <View className={styles.desc}>每组数据可获得6个白泽星奖励~</View>
                <View className={styles.desc}>如果您有隐私数据填写顾虑，欢迎体验「联邦学习」类问卷~</View>
            </View>
            <Submit 
              onClick={()=>{
                  Taro.navigateTo({url:'/pages/Results/index'})
              }}
            />
        </View>
    )
}

export default Index