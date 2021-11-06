import { View, Input, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import QuestionaireItem from '@/components/QuestionaireItem'
import Tail from '@/components/Tail'
import Tabs from './components/Tabs'
import request from '@/utils/request'
import styles from './index.module.less'
import { useState } from 'react'

// const modelItems = [{
//   id:'876576456', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211011155123.png', name:'手写数字识别', category:'机器学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:435
// },{
//   id:'876576356', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026105554.png', name:'手势识别模型', category:'计算机视觉', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:75
// },{
//   id:'870576456', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110038.png', name:'猫狗分类模型', category:'机器学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:66
// },{
//   id:'875576456', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110107.png', name:'抑郁症患者检测', category:'机器学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:91
// },{
//   id:'875576457', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110141.png', name:'水果新鲜度检测', category:'机器学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:148
// },{
//   id:'875576458', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110218.png', name:'目标检测模型', category:'计算机视觉', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:12
// },{
//   id:'875576459', type:'fl',
//   src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110244.png', name:'未来宝宝长相预测', category:'机器学习', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
//   author:'浙江大学', see:18
// },]

const questionnaireItems = [{
  id:'875576468', type:'ord',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110244.png', name:'未来宝宝长相预测', category:'普通问卷', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:18
},{
  id:'875576480', type:'ord',
  src:'https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211026110218.png', name:'目标检测模型', category:'普通问卷', info:'当给定一个数字时，在所给定的模版中逐一通过像素去比对，找出最相近的模版，并返回这个模版的数值标签，这个标签就是这个数字的值。事与愿违，由于手写数字千变万化，比如6，8，9这3个数字在进行像素比对时，所给测试数字由于大小形状问题，造成容易搞混的的情况。', 
  author:'浙江大学', see:12
}]



const Index = () =>{

  const [tab,setTab] = useState(1)

  const [fls, setFls] = useState([]) // 联邦学习问卷
  const [os, setOs] = useState([])   // 普通问卷

  useDidShow(()=>{
    (async function(){
      let res = await request({
        url: '/v1/admin/task/list?page=1&limit=100',
        method: 'get'
      })
      if (res instanceof Error) return
      setFls(res.list)
    })()
  },[])

    return (
        <View className={styles.index}>
            <View className={styles.header}>
                <Image className={styles.back} src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211012200140.png'
                  onClick={Taro.navigateBack}
                ></Image>
                <View className={styles.title}>更多问卷</View>
                <View className={styles.subTitle}>在这里发现更多有趣问卷......</View>

            </View>
            <View className={styles.content}>
              <Tabs value={tab} onChange={setTab}>
                {tab == 1? fls.map(i=>(
                    <View key={i.id} className={styles.item}>
                        <QuestionaireItem {...i}></QuestionaireItem>
                    </View>
                )):questionnaireItems.map(i=>(
                    <View key={i.id} className={styles.item}>
                        <QuestionaireItem {...i}></QuestionaireItem>
                    </View>
                ))}
              </Tabs>
              <Tail></Tail>
            </View>
        </View>
    )
}

export default Index