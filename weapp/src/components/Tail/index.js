import {View} from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <View className={styles.tail}>
                <AtDivider content='别翻了，你已经达到世界的尽头' fontColor='#999999'></AtDivider>
            </View>
        </View>
    )
}

export default Index