import { View, Image } from '@tarojs/components'
import { AtGrid } from "taro-ui"
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import TabBar from './components/TabBar'
import styles from './index.module.less'

const Index = () =>{
    const basicQuestions = [
        {value:'单选', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105113105.png', },
        {value:'多选', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105113206.png', },
        {value:'填空', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105113428.png', url:'/packageQuestion/pages/inputQuestion/index'},
        {value:'打分', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105113447.png', },
        {value:'上传图片', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105113505.png', url:'/packageQuestion/pages/imageQuestion/index'},
        {value:'上传文件', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105133843.png', },
        {value:'下拉', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105133913.png', },
        {value:'投票', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134127.png', },
        {value:'排序', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134208.png', },
        {value:'量表', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134220.png', },
        {value:'NPS', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134241.png'},
        {value:'备注说明', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134336.png', },
        {value:'分页', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105134344.png', },
    ]    

    const personalInfos = [
        {value:'姓名', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142312.png'},
        {value:'性别', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142327.png'},
        {value:'年龄', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142335.png'},
        {value:'手机', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142348.png'},
        {value:'邮箱', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142355.png'},
        {value:'日期', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142407.png'},
        {value:'时间', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142418.png'},
        {value:'地址', image:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105142425.png'},
    ]

    return (
        <View className={styles.index}>
            <NavBar title='题库' />
            <View className={styles.group}>
                <View className={styles.title}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105140750.png'></Image>
                    基础题库
                </View>
                <View className={styles.questions}>
                    <AtGrid 
                      columnNum={4}
                      data={basicQuestions}
                      onClick={(item,index)=>{
                          if (item.url){
                              Taro.navigateTo({url:item.url})
                          }
                      }}
                    />
                </View>
            </View>
            <View className={styles.group}>
                <View className={styles.title}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105140750.png'></Image>
                    个人信息
                </View>
                <View className={styles.questions}>
                    <AtGrid 
                      columnNum={4}
                      data={personalInfos}
                    />
                </View>
            </View>
            <TabBar />
        </View>
    )
}

export default Index 