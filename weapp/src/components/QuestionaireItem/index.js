import Taro from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import styles from './index.module.less'

// 本组件是模型展示组件、问卷展示组件
// 默认是普通的问卷
const index = ({id, src, name, category, info, author, see, type='ord'}) =>{

    const jump = ()=>{
        if (type == 'model'){
            Taro.navigateTo({url:`/pages/modelDesc/index?id=${id}&title=${name}`})
        }else if(type=='fl') {
            Taro.navigateTo({url:'/packageTask/pages/writeFLQuestionnaire/index'})
        }else {
            Taro.navigateTo({url:'/pages/writeQuestionnaire/index'})
        }
    }
    return (
        <View className={styles.index} hoverClass={styles.indexClick}
          onClick={jump}
        >
            <Image className={styles.image} src={src}></Image>
            <View className={styles.body}>
                <View className={styles.title}>
                    {name}
                    <View className={styles.tag}>{category}</View>
                </View>
                <View className={styles.info}>{info}</View>
                <View className={styles.tail}>
                    <View className={styles.author}>
                        发布者：{author}
                    </View>
                    <View className={styles.see}>
                        <Image className={styles.seeIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155702.png'></Image>
                        {see}
                    </View>
                </View>
                
            </View>
           
        </View>
    )
}

export default index