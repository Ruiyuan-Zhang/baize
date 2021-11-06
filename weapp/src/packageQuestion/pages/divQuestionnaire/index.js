import { View, Input, Textarea, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'

const Index = () =>{
    return (
        <View className={styles.index} >
            <NavBar title='编辑问卷' />
            <View className={styles.title}>问卷标题</View>
            <Input name='title' placeholder='请输入问卷标题'></Input>
            <View className={styles.title}>问卷简介</View>
            <Textarea name='docs' placeholder='简单介绍一下您的问卷......'></Textarea>
            <Button
              onClick={()=>Taro.navigateTo({url:'/packageQuestion/pages/chooseQuestion/index'})}
            >
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105094643.png'></Image>
                添加更多题目
            </Button>
        </View>
    )
}

export default Index 