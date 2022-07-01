import { View, Image } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import Tabs from './components/Tabs'
import styles from './index.module.less'
import ruleStyles from './rules.module.less'
import detailStyles from './details.module.less'

const Index = () =>{


    const [tab, setTab] = useState(2)

    const Rule = () =>{
        return (
            <View className={ruleStyles.rules}>
                <View className={ruleStyles.rule}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027113542.png'></Image>
                    <View className={ruleStyles.title}>什么是白泽星？</View>
                    <View className={ruleStyles.content}>白泽星是白泽问卷的积分形式，用来鼓励用户发布任务、填写问卷、测试模型，用户在使用小程序时完成相应任务即可获得白泽星奖励。</View>
                </View>
                <View className={ruleStyles.rule}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211027113542.png'></Image>
                    <View className={ruleStyles.title}>如何获取白泽星？</View>
                    <View className={ruleStyles.content}>
                        <View>a.首次登陆即可获得5000颗白泽星；</View>
                        <View>b.首次发布任务可以获得100颗白泽星；</View>
                        <View>c.填写问卷可以获得任务发布者设置的奖励，奖励依据你所提供的数据的完整度、份数等调整；</View>
                        <View>d.测试模型可以获得1～3颗白泽星；</View>
                        <View>e.白泽星不足时可以进行购买，10元=100颗；相应的，白泽星可兑换现金并体现至微信～</View>
                    </View>
                </View>
            </View>
        )
    }

    const Details = () =>{
        return (
            <View className={detailStyles.index}>
                <View className={detailStyles.rules}>
                    <View className={detailStyles.line}>
                        <View className={detailStyles.left}>
                            <View className={detailStyles.title}>首次创建并发布任务</View>
                            <View className={detailStyles.time}>2021-09-27 23:12:34</View>
                        </View>
                        <View className={detailStyles.right}>
                            +100
                        </View>
                    </View>
                    <View className={detailStyles.line}>
                        <View className={detailStyles.left}>
                            <View className={detailStyles.title}>首次登录</View>
                            <View className={detailStyles.time}>2021-09-24 22:34:56</View>
                        </View>
                        <View className={detailStyles.right}>
                            +5000
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View className={styles.index}>
            <View className={styles.back}>
                <View className={styles.line}
                  onClick={()=>Taro.navigateBack()}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026222143.png'></Image>
                    我的白泽星
                </View>
                <View className={styles.baize}>
                    <View className={styles.user}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026222834.png'> </Image>
                        <View className={styles.info}>
                            <View className={styles.name}>白泽1784</View>
                            <View className={styles.phone}>187****4689</View>
                        </View>
                    </View>
                    <View className={styles.balance}>
                        5100
                        <View className={styles.balanceHandles}>
                            <View className={styles.balanceHandle}>
                                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026224848.png'></Image>
                                充值
                            </View>
                            <View className={styles.balanceHandle}>
                                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026224914.png'></Image>
                                体现
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <Tabs className={styles.tabs} value={tab} onChange={setTab} >
                {tab==1?<Rule />:<Details />}
            </Tabs>
        </View>
    )
}

export default Index