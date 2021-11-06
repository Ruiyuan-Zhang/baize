import { Input, View, Picker, Image } from '@tarojs/components'
import Title from '../../components/Title'
import { AtSwitch } from 'taro-ui'
import Content from '../../components/Content'
import styles from './index.module.less'

const Index = () =>{

    return (
        <View className={styles.index}>
            <Title>题目</Title>
            <Content>
                <Input placeholder='请点击编辑题目'></Input>
            </Content>
            <Title>题目设置</Title>
            <Content>
                <AtSwitch title='此题必答' />
                <Picker range={['小','中','大']} extraText='小'>
                    <View className={styles.picker}>
                        <View>输入最大上传数量</View>
                        <View>
                            1
                            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106095315.png'></Image>
                        </View>
                    </View>
                </Picker>
                <Picker range={['小','中','大']} extraText='小'>
                    <View className={styles.picker}>
                        <View>仅限拍照后上传</View>
                        <View>
                            是
                            <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211106095315.png'></Image>
                        </View>
                    </View>
                </Picker>
            </Content>
        </View>
    )
}

export default Index