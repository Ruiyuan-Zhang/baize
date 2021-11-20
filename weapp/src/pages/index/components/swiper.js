import { View, Input, Image } from '@tarojs/components'
import { AtButton,AtDivider } from 'taro-ui'
import { Swiper, SwiperItem } from '@tarojs/components'
import styles from './swiper.module.less'

const Index = () =>{
    const swiperImages = [
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106164938.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165106.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165150.png',
        'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106165204.png',
    ]
    return (
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
    )
}

export default Index