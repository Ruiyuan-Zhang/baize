import {View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './hotModalList.module.less'

const Index = () =>{
    const hotItems = [{
        rank: 0, name: '水果新鲜度检测', tag:'计算机视觉', tagColor:'#fbf0d1',color:'#eeb13a',
        image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211107053706.png',
        rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.1@3x.png'
        },{
        rank: 1, name: '抑郁倾向预测', tag:'自然语言处理', tagColor:'#cbefde',color:'#00af5d',
        image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211107053748.png',
        rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.2@3x.png'
        },{
        rank: 2, name: '黑色素瘤诊断', tag:'计算机视觉', tagColor:'#fbf0d1',color:'#eeb13a',
        image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211107053852.png',
        rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.3@3x.png'
    }]
    
    const HotItem = ({rank, rankImage, name, tag, color, tagColor, image})=>{
    return (
        <View className={styles.hotItem}
            onClick={()=>{
                Taro.vibrateShort()
                Taro.navigateTo({url:`/pages/modelDesc/index?title=${name}`})
            }}
            >
            <Image className={styles.rankImage} src={rankImage}></Image>
            <Image className={styles.hotItemImage} src={image}></Image>
            <View className={styles.hotItemName}>{name}</View>
            <View className={styles.tag} style={{background:tagColor, color}}>{tag}</View>
            </View>
        )
    }
      
    return(
        <View className={styles.hot}>
            <View className={styles.title}>
            <Image className={styles.titleIcon} mode='heightFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/rememg_title@3x.png'></Image>
            <View className={styles.more}
                onClick={()=>Taro.vibrateShort()&&Taro.navigateTo({url:'/pages/modelList/index'})}
            >
                查看更多
                <Image className={styles.moreIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/more_icon@2x.png' ></Image>
            </View>
            </View>
            <View className={styles.hotRank}>
            {hotItems.map(hi=><HotItem key={hi.rank} {...hi}></HotItem>)}
            </View>
        </View>
    )
}

export default Index