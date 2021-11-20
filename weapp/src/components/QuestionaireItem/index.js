import { View,Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {file_url} from '@/config/index'
import styles from './index.module.less'

// 本组件是模型展示组件、问卷展示组件
// 默认是普通的问卷
const index = ({id, file, fileAdd = true, name, categoryName, description, author='白泽团队官方', see, type='ord'}) =>{

    if (fileAdd){
        file = file_url + file
    }
    see = Math.floor((Math.random()*100)+100);

    const jump = ()=>{
        if (type == 'model'){
            Taro.navigateTo({url:`/pages/modelDesc/index?id=${id}&title=${name}`})
        }else if(type=='fl') {
            Taro.navigateTo({url:`/packageTask/pages/writeFLQuestionnaire/index?id=${id}`})
        }else {
            Taro.navigateTo({url:'/pages/writeQuestionnaire/index'})
        }
    }

    return (
        <View className={styles.index} hoverClass={styles.indexClick}
          onClick={jump}
        >
            <Image className={styles.image} src={file} mode='widthFix'></Image>
            <View className={styles.body}>
                <View className={styles.title}>
                    <View className={styles.name}>{name}</View>
                    {
                        type=='model'?'':<View className={styles.tag} style={{backgroundColor:'#bed9c8',color:'#4eab5c'}}>
                            {type == 'fl' && '联邦学习问卷'}
                            {type == 'ord' && '普通问卷'}
                        </View>
                    }

                    {/* {categoryName&&<View className={styles.tag} style={{backgroundColor:'#cbc5df',color:'#6026d4'}}>{categoryName}</View>} */}
                    
                </View>
                <View className={styles.info}>{description}</View>
                <View className={styles.tail}>
                    <View className={styles.author}>
                        发布者：{author}
                    </View>
                    <View className={styles.see}>
                        <Image className={styles.seeIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155702.png'></Image>{see}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default index