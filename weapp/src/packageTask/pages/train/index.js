import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { AtTimeline } from 'taro-ui'
import { init } from '@/train'
// 这里不能错顺序，要不然会报错
import Chart from '../../components/chart'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'

const Index = () =>{
    const [chartData,setChartData] = useState([])
    const [timeLineData,setTimeLineData] = useState([])

    useEffect(()=>{
        (async function(){
            // 初始化训练环境
            init()

            // 添加图标数据
            const addChartData = (index,loss) => {
                chartData.push([index,loss])
                setChartData([...chartData])
            }
            const addTimeLineData = title =>{
                timeLineData.unshift({title})
                setTimeLineData([...timeLineData])
            }
            // 开始时间、结束时间
            let beginTime = (new Date()).getTime()
            let endTime
            addTimeLineData("正在启动训练...")
            addTimeLineData("正在加载远程全局模型...")
            
            // 执行本地训练
            // xxx
            for (let i=0;i<100;i++){
                addChartData(i,i*10+30)
                addTimeLineData(`训练第${i}轮`)
            }
           
            addTimeLineData("训练结束")
            addTimeLineData(`客户端模型上传成功`)

            // 提交本轮训练
            // xxx

            addTimeLineData(`客户端模型提交成功`)
        })()
    },[])

    return (
        <View className={styles.index}>
            <NavBar title='利用本地资源训练中...' />
            <View className={styles.title}>训练情况折线图</View>
            <Chart data={chartData} name={'手写数字识别实验'} subtext="本地模型训练情况（损失率）"/>
            <View className={styles.title}>训练进度列表</View>
            <View className={styles.timeLine}>
                <AtTimeline items={timeLineData} />
            </View>
        </View>
    )
}

export default Index 