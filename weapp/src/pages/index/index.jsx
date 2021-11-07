import { View, Input, Image } from '@tarojs/components'
import { AtButton,AtDivider } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import Taro, { clearStorage, useDidShow } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import Tail from '@/components/Tail'
import Tabbar from '@/components/Tabbar'
import QuestionaireItem from '@/components/QuestionaireItem'
import request from '@/utils/request'
import styles from './index.module.less'



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
          Taro.navigateTo({url:`/pages/modelDesc/index`})
        }}
      >
        <Image className={styles.rankImage} src={rankImage}></Image>
        <Image className={styles.hotItemImage} src={image}></Image>
        <View className={styles.hotItemName}>{name}</View>
        <View className={styles.tag} style={{background:tagColor, color}}>{tag}</View>
      </View>
    )
  }
  
  const swiperImages = [
    'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106164938.png',
    'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165106.png',
    'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165150.png',
    'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165204.png',
  ]

  const [questionaireItems, setQuestionaireItems] = useState([])
  useDidShow(()=>{
    (async function(){
      let res = await request({
        url: '/v1/admin/task/list?page=1&limit=10',
        method: 'get'
      })
      if (res instanceof Error) return
      console.log(res)
      res.list.shift()
      setQuestionaireItems(res.list)
      // setList(res.list)
    })()
  },[])

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

    {/* 今日份有趣问卷 */}
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
              <QuestionaireItem {...i} type='fl'></QuestionaireItem>
            </View>
          ))}
        </View>
    </View>
    <Tail />
    <Tabbar index={0} />
  </View>
  )
}

export default Index