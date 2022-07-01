import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import styles from './index.module.less'

const Index = () =>{

    const [current, setCurrent] = useState(0)

    return (
        <View className={styles.index}>
            <AtSearchBar 
              placeholder='请输入想要使用的模板名称'
            />
            <AtTabs 
              tabDirection='horizontal'
              scroll
              current={current}
              onClick={setCurrent} 
              tabList={[
                {title:"计算机视觉"},
                {title:"自然语言处理"},
                {title:"机器学习"},
                {title:"语音识别"},
              ]}
            >
                <AtTabsPane current={current} index={0}>
                    <View className={styles.content}>
                        <View className={styles.item} hoverClass={styles.btnOn}
                          onClick={()=>Taro.navigateTo({url:'/pages/FLTemplate/index'})}
                        >
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013232856.png'></Image>
                            <View className={styles.name}>手写数字识别</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235137.png'></Image>
                            <View className={styles.name}>水果新鲜度测评</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235241.png'></Image>
                            <View className={styles.name}>医学图像分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235313.png'></Image>
                            <View className={styles.name}>种类分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                    <View className={styles.content}>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013232856.png'></Image>
                            <View className={styles.name}>手写数字识别</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235137.png'></Image>
                            <View className={styles.name}>水果新鲜度测评</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235241.png'></Image>
                            <View className={styles.name}>医学图像分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235313.png'></Image>
                            <View className={styles.name}>种类分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                <View className={styles.content}>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013232856.png'></Image>
                            <View className={styles.name}>手写数字识别</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235137.png'></Image>
                            <View className={styles.name}>水果新鲜度测评</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235241.png'></Image>
                            <View className={styles.name}>医学图像分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235313.png'></Image>
                            <View className={styles.name}>种类分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                    </View>
                </AtTabsPane>
                <AtTabsPane current={current} index={3}>
                <View className={styles.content}>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013232856.png'></Image>
                            <View className={styles.name}>手写数字识别</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235137.png'></Image>
                            <View className={styles.name}>水果新鲜度测评</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235241.png'></Image>
                            <View className={styles.name}>医学图像分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                        <View className={styles.item}>
                            <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013235313.png'></Image>
                            <View className={styles.name}>种类分析</View>
                            <View className={styles.info}>
                                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211013233100.png'></Image>
                                50次
                            </View>
                        </View>
                    </View>
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}

export default Index