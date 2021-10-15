import { View, Input, Button, Image } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import Taro from '@tarojs/taro'
import Tips from '@/components/Tips'
import Checkbox from '@/components/Checkbox'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index}>
            <View className={styles.h2}>问卷标题</View>
            <View className={styles.title}>
                <View className={styles.left}>
                    <View className={styles.h3}>手写数字识别</View>
                    <View>通过训练模型，可以让机器学会手写数字识别分类~</View>
                </View>
                <View className={styles.right}>
                    编辑
                </View>
            </View>

            <View className={styles.h2}>问卷题目</View>
            <View className={styles.questions}>
                <View className={styles.question}>
                    <View className={styles.h4}>请输入含有手写数字的图片</View>
                    <AtImagePicker></AtImagePicker>
                </View>
                <View className={styles.question}>
                    <View className={styles.h4}>请输入图片中的数字</View>
                    <Input placeholder='请输入数值类型的数字...'></Input>
                </View>
            </View>

            <View className={styles.h2}>问卷题目</View>
            <View className={styles.settings}>
                <View className={styles.line}>
                    <View className={styles.l}>
                        <View className={styles.font}>*</View>
                        <View className={styles.setting}>最大参与次数</View>
                    </View>
                    <View className={styles.r}>
                        <View className={styles.input}><Input></Input></View>
                        <View className={styles.dw}>次</View>
                    </View>
                </View>
                <View className={styles.line}>
                    <View className={styles.l}>
                        <View className={styles.font}>*</View>
                        <View className={styles.setting}>每份数据奖励</View>
                    </View>
                    <View className={styles.r}>
                        <View className={styles.input}><Input></Input></View>
                        <View className={styles.dw}>星</View>
                    </View>
                </View>
                <View className={styles.line}>
                    <View className={styles.l}>
                        <View className={styles.font}>*</View>
                        <View className={styles.setting}>同时发布预模型</View>
                    </View>
                    <View className={styles.r}>
                        <Checkbox checked></Checkbox>
                    </View>
                </View>
                <View className={styles.line}>
                    <View className={styles.l}>
                        <View className={styles.font}>*</View>
                        <View className={styles.setting}>数据收集方式</View>
                    </View>
                    <View className={styles.r}>
                        <View className={styles.methods}>
                            <View className={styles.method}>
                                <View className={styles.methodName}>原始数据</View>
                                <Checkbox checked></Checkbox>
                            </View>
                            <View className={styles.method}>
                                <View className={styles.methodName}>本地数据</View>
                                <Checkbox ></Checkbox>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        
            <Tips text='更多更复杂的模型创建可在白泽Web端进行～' />

            <View className={styles.handle}>
                <Button className={styles.btn}>
                    <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015195542.png'></Image>
                    预览
                </Button>
                <Button className={styles.btn}
                  onClick={()=>Taro.navigateTo({url:'/pages/Results/index'})}
                >
                    <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015200534.png'></Image>
                    发布
                </Button>
            </View>
        </View>
    )
}

export default Index