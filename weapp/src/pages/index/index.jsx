import { View, Input, Image } from '@tarojs/components'
import { AtButton,AtDivider } from 'taro-ui'
import QuestionaireItem from '@/components/QuestionaireItem'
import Taro from '@tarojs/taro'
import styles from './index.module.less'

const hotItems = [{
  rank: 0, name: '手写数字识别', tag:'机器学习', tagColor:'#fbf0d1',color:'#eeb13a',
  image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011144205.png',
  rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.1@3x.png'
},{
  rank: 1, name: '手势模型识别', tag:'计算机视觉', tagColor:'#cbefde',color:'#00af5d',
  image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011144908.png',
  rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.2@3x.png'
},{
  rank: 2, name: '猫狗分类模型', tag:'机器学习', tagColor:'#fbf0d1',color:'#eeb13a',
  image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011144949.png',
  rankImage:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_remen_tag_NO.3@3x.png'
}]
const HotItem = ({rank, rankImage, name, tag, color, tagColor, image})=>{
  return (
    <View className={styles.hotItem}>
      <Image className={styles.rankImage} src={rankImage}></Image>
      <Image className={styles.hotItemImage} src={image}></Image>
      <View className={styles.hotItemName}>{name}</View>
      <View className={styles.tag} style={{background:tagColor, color}}>{tag}</View>
    </View>
  )
}

const index = () =>{
  return (
  <View className={styles.index}>
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
      <Image className={styles.intro} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211009205105.png'></Image>
    </View>
    <View className={styles.questionaire}> 
        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_fabu@3x.png'
          onClick={()=>Taro.navigateTo({url:'/pages/selectSubmitFunction/index'})}
        ></Image>
        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_tianxie@3x.png'></Image>
    </View>
    <View className={styles.hot}>
        <View className={styles.title}>
          <Image className={styles.titleIcon} mode='heightFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/rememg_title@3x.png'></Image>
          <View className={styles.more}
            onClick={()=>Taro.navigateTo({url:'/pages/modelList/index'})}
          >
            查看更多
            <Image className={styles.moreIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/more_icon@2x.png' ></Image>
          </View>
        </View>
        <View className={styles.hotRank}>
          {hotItems.map(hi=><HotItem key={hi.rank} {...hi}></HotItem>)}
        </View>
    </View>
    <View className={styles.fun}>
        <View className={styles.title}>
          <Image className={styles.titleIcon} mode='heightFix' src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/wenjuan_title@3x.png'></Image>
          <View className={styles.more}>
            查看更多
            <Image className={styles.moreIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/more_icon@2x.png' ></Image>
          </View>
        </View>
        <View className={styles.qItems}>
          <View className={styles.item}>
            <QuestionaireItem ></QuestionaireItem>
          </View>
          <View className={styles.item}>
            <QuestionaireItem ></QuestionaireItem>
          </View>
          <View className={styles.item}>
            <QuestionaireItem ></QuestionaireItem>
          </View>
          <View className={styles.item}>
            <QuestionaireItem ></QuestionaireItem>
          </View>
        </View>
    </View>
    <View className={styles.tail}>
      <AtDivider content='别翻了，你已经达到世界的尽头' fontColor='#999999'></AtDivider>
    </View>
  </View>
  )
}

export default index