import { View, Input, Image } from '@tarojs/components'
import { AtButton,AtDivider } from 'taro-ui'
import QuestionaireItem from '@/components/QuestionaireItem'
import { Swiper, SwiperItem } from '@tarojs/components'
import Tail from '@/components/Tail'
import Tabbar from '@/components/Tabbar'
import Taro, { clearStorage } from '@tarojs/taro'
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


const questionaireItems = [{
  id:'876576456',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png', name:'手写数字识别', category:'联邦学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:123
},{
  id:'876576356',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png', name:'手写数字识别', category:'联邦学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:123
},{
  id:'870576456',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png', name:'手写数字识别', category:'联邦学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:123
},{
  id:'875576456',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png', name:'手写数字识别', category:'联邦学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:123
},]

const swiperImages = [
  'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106164938.png',
  'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165106.png',
  'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165150.png',
  'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165204.png',
]

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
      <View className={styles.intro} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211009205105.png'>
        <Swiper
          className='test-h'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {swiperImages.map((image,i)=>(
            <SwiperItem key={i}>
              <Image className={styles.swiperImage} src={image} mode='widthFix'></Image>
            </SwiperItem>
          ))}
              
        </Swiper>
      </View>
    </View>
    <View className={styles.questionaire}> 
        <View hoverClass={styles.on}>
          <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_fabu@3x.png'
            onClick={()=>Taro.navigateTo({url:'/pages/selectSubmitFunction/index'})}
          ></Image>
        </View>
        <View>
          <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/homepage_button_tianxie@3x.png'></Image>
        </View>
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
          <View className={styles.more}
            onClick={()=>Taro.navigateTo({url:'/pages/questionnaireList/index'})}
          >
            查看更多
            <Image className={styles.moreIcon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/more_icon@2x.png' ></Image>
          </View>
        </View>
        <View className={styles.qItems}>
          {questionaireItems.map(i=>(
            <View className={styles.item} key={i.id}>
              <QuestionaireItem {...i}></QuestionaireItem>
            </View>
          ))}
        </View>
    </View>
    <Tail />
    <Tabbar index={0} />
  </View>
  )
}

export default index