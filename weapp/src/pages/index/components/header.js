import {View, Image, Input} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Swiper from './swiper'
import styles from './header.module.less'

const Index = () =>{
    return(
        <View className={styles.header}>
            <View className={styles.bg}></View>
            <View className={styles.searchWrap}>
            <View className={styles.search}>
                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/search%20bar_icon.png'></Image>
                <Input className={styles.input} type='text' placeholder='请输入想要搜索的问卷名称' />
                <AtButton className={styles.btn} circle size='small' >搜索</AtButton>
            </View>
            <Image className={styles.add} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_add_icon.png'></Image>
            </View>
            <View className={styles.intro} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211009205105.png'><Swiper/></View>
        </View>
    )
}

export default Index