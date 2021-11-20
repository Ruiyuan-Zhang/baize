import {View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {file_url} from '@/config/index'
import styles from './index.module.less'

const Index = ({className, submit=true,id, file,name,description,createAt }) => {
    return (
        <View className={className+' '+styles.index}>
            <View className={styles.top}>
                <Image src={file_url+file}></Image>
                <View className={styles.right}>
                    <View className={styles.title}>{name}</View>
                    <View className={styles.content}>{description}</View>
                    <View className={styles.time}>发布时间：{createAt}</View>
                    <View className={styles.details}
                        onClick={()=>Taro.navigateTo({url:`/packageTask/pages/writeFLQuestionnaire/index?id=${id}`})}
                    >
                        查看详情
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028222557.png'></Image>
                    </View>
                </View> 
            </View>
            <View className={styles.midLine}></View>
            <View className={styles.buttom}>
                <View className={styles.handle}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028215652.png'></Image>
                    分享
                </View>
                <View className={styles.line}></View>
                <View className={styles.handle}>
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028215804.png'></Image>
                    模型预览
                </View>
                {!submit&&<>
                    <View className={styles.line}></View>
                    <View className={styles.handle}
                      onClick={()=>Taro.navigateTo({url:`/packageTask/pages/myLocalData/index?id=${id}`})}
                    >
                        <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211028225529.png'></Image>
                        提交在本地的数据
                    </View>
                </>}
                <View className={styles.line}></View>
                <View className={styles.handle}
                    onClick={()=>{
                        if (submit){
                            Taro.navigateTo({url:'/packageTask/pages/myTaskSchedule/index'})
                        }else{
                            Taro.navigateTo({url:'/packageTask/pages/taskSchedule/index'})
                        }
                        
                    }}
                >
                    <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211107102641.png'></Image>
                    任务进展
                </View>
            </View>
        </View>
    )
}

export default Index