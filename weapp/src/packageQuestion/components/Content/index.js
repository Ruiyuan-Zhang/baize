import {View } from '@tarojs/components'
import styles from './index.module.less'

const Index = ({children}) =>{
    return (
        <View className={styles.index}>
            {children}
        </View>
    )
}

export default Index 