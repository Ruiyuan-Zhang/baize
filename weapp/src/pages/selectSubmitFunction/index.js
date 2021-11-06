import {View, Image, Input} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {AtButton} from 'taro-ui'
import styles from './index.module.less'

const index = () =>{
    return (
        <View className={styles.index}>
            <View className={styles.header}>
                <Image className={styles.back} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211012200140.png'
                  onClick={Taro.navigateBack}
                ></Image>
                <View className={styles.tips}>请选择您的发布方式......</View>
                <View className={styles.search}>
                    <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/search%20bar_icon.png'></Image>
                    <Input className={styles.input} type='text' placeholder='请输入想要搜索的问卷名称' />
                    <AtButton className={styles.btn} circle size='small' >搜索</AtButton>
                </View>
            </View>
            <View className={styles.item}>
                <View className={styles.fl + " " + styles.method}>
                    <View className={styles.name}>联邦学习问卷</View>
                    <View className={styles.content}>
                        <View className={styles.btn} hoverClass={styles.btnOn}
                          onClick={()=>Taro.navigateTo({url:'/pages/FLcategory/index'})}
                        >
                            <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/issue_lianbang_muban_icon@3x.png'></Image>
                            从模板中创建
                        </View>
                        <View className={styles.btn}
                          onClick={()=>Taro.navigateTo({url:'/pages/divFLquestionnaire/index'})}
                        >
                            <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/issue_lianbang_zidingyi_icon@3x.png'></Image>
                            自定义创建
                        </View>
                    </View>
                </View>
                <View className={styles.old + " " + styles.method}>
                    <View className={styles.name}>普通问卷</View>
                    <View className={styles.content}>
                        <View className={styles.btn}
                          onClick={()=>Taro.navigateTo({url:'/packageQuestion/pages/divQuestionnaire/index'})}
                        >
                            <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/issue_putong_muban_icon.png'></Image>
                            从模板中创建
                        </View>
                        <View className={styles.btn}>
                            <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/issue_putong_zidingyi_icon.png'></Image>
                            自定义创建
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default index