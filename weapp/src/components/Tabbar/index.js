import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const Index = ({index=0}) =>{
    const tabs = [
        {name:'首页', url:'/pages/index/index', off:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/shouye_g@3x.png', on:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/shouye_b@3x.png'},
        {name:'问卷', url:'/pages/question/index', off:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wenjuan_g@3x.png', on:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wenjuan_b@3x.png'},
        {name:'任务', url:'/pages/task/index', off:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/renwu_g@3x.png', on:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/renwu_b@3x.png'},
        {name:'我的', url:'/pages/mine/index', off:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wode_g@3x.png', on:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wode_b@3x.png'},
    ]
    return (
        <View className={styles.index}>
            <View className={styles.tabs}>
                <View className={styles.tab} onClick={()=>Taro.switchTab({url:tabs[0].url})}>
                    <Image src={index===0?tabs[0].on:tabs[0].off}></Image>
                    {tabs[0].name}
                </View>
                <View className={styles.tab} onClick={()=>Taro.switchTab({url:tabs[1].url})}>
                    <Image src={index==1?tabs[1].on:tabs[1].off}></Image>
                    {tabs[1].name}
                </View>
                <View className={styles.add}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/add_b@3x.png'
                        onClick={()=>{
                            Taro.navigateTo({url:'/pages/selectSubmitFunction/index'})
                            
                        }}
                    ></Image>
                </View>
                <View className={styles.tab} onClick={()=>Taro.switchTab({url:tabs[2].url})}>
                    <Image src={index==2?tabs[2].on:tabs[2].off}></Image>
                    {tabs[2].name}
                </View>
                <View className={styles.tab} onClick={()=>Taro.switchTab({url:tabs[3].url})}>
                    <Image src={index==3?tabs[3].on:tabs[3].off}></Image>
                    {tabs[3].name}   
                </View> 
            </View>
        </View>
    )
}

export default Index