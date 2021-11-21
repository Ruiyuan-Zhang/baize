import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { AtTimeline } from 'taro-ui'
import { init, train } from '@/train'
import { getLocalDataList } from '@/common/data'
import { getUser} from '@/common/user'
import request from '@/utils/request'
// 这里不能错顺序，要不然会报错
import NavBar from '@/components/NavBar'
import Chart from '../../components/chart'
import styles from './index.module.less'

const Index = () =>{

    const {id,name} = Taro.getCurrentInstance().router.params

    // 查询该任务的全局模型情况
    const getGlobalModel = async () =>{
        let res = await request({method:'get',url:'/v1/admin/model/global/list',data:{
            taskId:id, page:1, limit:100
        }})
        if (res instanceof Error) return
        const list = res.list
        return list[list.length-1]
    }

    // 查询任务信息
    const getTaskWithDetails = async () =>{
        let res = await request({url:`/v1/admin/task/detailWithFormat?id=${id}`,method:'get'})
        if (res instanceof Error)return
        return res.data
    }

    const [chartData,setChartData] = useState([])
    const [timeLineData,setTimeLineData] = useState([])
    useEffect(()=>{
        (async function(){
            // 初始化训练环境
            init()

            // 添加图表数据
            const addChartData = (index,loss) => {
                chartData.push([index,loss])
                setChartData([...chartData])
            }
            // 添加一条日志数据
            const addTimeLineData = title =>{
                timeLineData.unshift({title})
                setTimeLineData([...timeLineData])
            }
            // 开始时间、结束时间
            let beginTime = (new Date()).getTime()
            let endTime

            addTimeLineData('正在下载任务信息...')
            const task = await getTaskWithDetails()
            addTimeLineData('下载任务信息完成')
            
            addTimeLineData("正在加载远程全局模型信息...")
            const globalModel = await getGlobalModel()
            addTimeLineData("加载远程全局模型信息完成")

            addTimeLineData("正在加载本地数据...")
            const dataList = getLocalDataList(id)
            addTimeLineData('加载本地数据完成')
            
            addTimeLineData("正在启动训练...")
            // 执行本地训练
            const newClientModelUrl = await train({
                task, globalModelFile:globalModel.file, dataList,
                onLoadModel: ()=>{
                    addTimeLineData("远程全局模型加载完毕")
                },
                onIndexEpochEnd: ({epoch,logs}) =>{
                    addChartData(epoch,logs.loss)
                    addTimeLineData("Loss after Epoch " + epoch + " : " + logs.loss)
                    // addTimeLineData("Acc after Epoch " + epoch + " : " + logs.acc)
                    // addTimeLineData("Val_Loss after Epoch " + epoch + " : " + logs.val_loss)
                    // addTimeLineData("Val_Acc after Epoch " + epoch + " : " + logs.val_acc)
                },
                onTrainEnd: ()=>{
                    addTimeLineData("训练结束")
                    endTime = (new Date()).getTime()
                    addTimeLineData(`本次训练总耗时长${endTime-beginTime}ms`)
                },
                onModalSaveStart:()=>{
                    addTimeLineData('正在上传客户端模型文件...')
                },
                onModalSaveEnd:()=>{
                    addTimeLineData('上传客户端模型文件成功')
                }
            })
            console.log(newClientModelUrl)
            addTimeLineData('正在提交客户端模型...')
            console.log(globalModel)
            let res = await request({
                url:'/v1/admin/model/client/add',
                data:{
                    globalModelId:globalModel.id,
                    taskId:task.idStr,
                    userName:getUser().user_name,
                    file:newClientModelUrl,
                    time:endTime-beginTime+"",
                }
            })
            if (res instanceof Error)return
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