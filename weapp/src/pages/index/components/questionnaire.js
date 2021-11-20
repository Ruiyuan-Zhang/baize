import {View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './questionnaire.module.less'

const Index = () =>{
    return (
        <View className={styles.questionaire}> 
            <View >
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_fabu@3x.png'
                onClick={()=>{
                Taro.navigateTo({url:'/pages/selectSubmitFunction/index'})
                }}
            ></Image>
            </View>
            <View>
            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_tianxie@3x.png'
                onClick={()=>{
                Taro.navigateTo({url:'/pages/questionnaireList/index'})
                }}
            ></Image>
            </View>
        </View>
    )
}

export default Index