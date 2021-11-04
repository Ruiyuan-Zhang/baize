import {View} from '@tarojs/components'
import Chart from '../../components/chart'
import NavBar from '@/components/NavBar'
import TimeLine from '@/components/TimeLine'
import { AtSwitch } from 'taro-ui'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <NavBar title='任务进展' />
            <View className={styles.line}>
                <View className={styles.title}>训练情况折线图</View>
                <View className={styles.content}>
                    <Chart 
                      data={[0,0.4,0.5,0.55,0.6,0.65,0.7,0.72,0.75,0.8,0.81]}
                      name='手写数字识别-浙江大学群体实验'
                      subtext='全局模型训练情况（准确率）'
                    />
                </View>
            </View>
            <View className={styles.line}>
                <View className={styles.title}>训练情况列表</View>
                <View className={styles.content}>
                    <TimeLine />
                </View>
            </View>
            <View className={styles.handle}>
                <View style={{color:"red",display:'inline-block'}}>*</View>
                <AtSwitch title='在训练后发布' />
            </View>
           
        </View>
    )
}

export default Index