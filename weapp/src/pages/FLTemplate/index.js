import { View, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTag } from 'taro-ui'
import Tips from '@/components/Tips'
import Table from 'taro3-table'
import styles from './index.module.less'

const Index = () =>{

    const dataSource = [
        {
            name: '图片',
            type: 'image',
            size: '28*28',
            englishName: 'image',
            tips: '请输入含有手写数字的图片',
        }, {
            name: '值',
            type: 'value',
            size: '-',
            englishName: 'value',
            tips: '请输入图片中数字的正确值',
        }
    ]

    const columns = [
        {
            title: 'name',
            dataIndex: 'name'
        }, {
            title: 'type',
            dataIndex: 'type'
        }, {
            title: 'size',
            dataIndex: 'size'
        }, {
            title: 'englishName',
            dataIndex: 'englishName'
        }, {
            title: 'tips',
            dataIndex: 'tips'
        }
    ]


    return <View className={styles.index}>
        <Image className={styles.image} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211014235646.png'></Image>
        <View className={styles.intro}>
            <View className={styles.title}>
                <View className={styles.name}>
                    数字识别模板
                    <AtTag>联邦学习问卷</AtTag>
                </View>
            </View>
            <View className={styles.content}>
                该模板用的是一个784*784*10的一个CNN网络，可以用28*28灰度图片的输入，分类2 - 10类别。可以用于您发布一个联邦学习问卷。
            </View>
        </View>
        <View className={styles.info}>
            <View className={styles.line}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015000901.png'></Image>
                <View> 784*748*10的CNN网格 </View>
            </View>
            <View className={styles.line}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015000953.png'></Image>
                <View> 28*28灰度图片 </View>
            </View>
            <View className={styles.line}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015001017.png'></Image>
                <View> 分类2-10类别 </View>
            </View>
        </View>
        <View className={styles.dataFormat}>
            <View className={styles.infoName}>数据格式</View>
            <Table
              columns={columns}
              dataSource={dataSource}
              scroll={{x:true}}
              style={{width:'670rpx'}}
              titleStyle={{width:'125rpx'}}
              colStyle={{width:'125rpx'}}
            ></Table>
        </View>
        <Tips text='问卷会根据表格格式生成~'/>
        <View className={styles.handle}>
            <View className={styles.share}>
                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015011543.png'></Image>
                分享
            </View>
            <View className={styles.star}>
                <Image className={styles.icon} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015011623.png'></Image>
                收藏
            </View>
            <Button className={styles.btn}
              onClick={()=>Taro.navigateTo({url:'/pages/FLedit/index'})}
              hoverClass={styles.btnOn}
            >
                <Image className={styles.add} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211015011426.png'></Image>
                使用此模板创建
            </Button>
        </View>
    </View>
}

export default Index