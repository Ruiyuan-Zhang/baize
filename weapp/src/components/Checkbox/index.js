import { View } from '@tarojs/components'
import styles from './index.module.less'

const Index = ({checked=false}) =>{
    return (
        <View className={checked?styles.checked:styles.noChecked}>
            
        </View>
    )
}

export default Index