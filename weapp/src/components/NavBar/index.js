import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const Index = ({title}) =>{
    return (
        <View className={styles.index}
          onClick={()=>Taro.navigateBack()}
        >  
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211030160216.png'></Image>
            {title}
        </View>
    )
}

export default Index