import {View, Image, Button} from '@tarojs/components'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <NavBar title='打包任务'></NavBar>
            <View className={styles.tip}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105061834.png'></Image>
                您提交的本地数据已经打包完成，请您下载到电脑端执行。
            </View>
            <View className={styles.title}>下载步骤</View>
            <View className={styles.content}>
                <View className={styles.h1}>
                    <View className={styles.highlight}>Step1.</View>下载长期运行代码包
                </View>
                <View className={styles.h2}>
                    <View className={styles.method}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105062154.png'></Image>
                        <View className={styles.h3}>方式1：局域网方式</View>
                        <View className={styles.info}>
                            请点击
                            <View className={styles.highlight}>http://127.0.0.5:5000/</View>
                            下载 
                        </View>
                    </View>
                    <View className={styles.method}>
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105062154.png'></Image>
                        <View className={styles.h3}>方式2：加密传输方式</View>
                        <View className={styles.info}>
                            加密传输本地“数据+代码”包
                        </View>
                    </View>
                </View>
                <View className={styles.h1}>
                    <View className={styles.highlight}>Step2.</View>在电脑端点击运行
                </View>
                <Image className={styles.command} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105062459.png'></Image>
                <Button className={styles.ok}>确定</Button>
            </View>
        </View>
    )
}

export default Index