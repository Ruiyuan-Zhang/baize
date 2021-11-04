import { View } from '@tarojs/components'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'

const Index = () =>{
    return(
        <View className={styles.index}>
            <NavBar title='任务进展' />
            <View className={styles.title}>每轮训练情况</View>
            <View className={styles.train}>

            </View>
            <View className={styles.title}></View>

            
        </View>
    )
}

export default Index