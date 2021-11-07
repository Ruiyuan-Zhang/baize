import {View} from '@tarojs/components'
import { useState } from 'react'
import Tail from '@/components/Tail'
import Tabbar from '@/components/Tabbar'
import Tabs from './components/Tabs'
import TaskItem from './components/TaskItem'
import { getUser } from '@/common/user'
import request from '@/utils/request'
import styles from './index.module.less'
import { useDidShow } from '@tarojs/taro'

const Submits = ({tasks}) =>{
    return(
        <View className={styles.submits}>
            {tasks.map((x, i)=>(
                <TaskItem key={'task-'+i} />
            ))}
        </View>
    )
}

const Joins = ({joins}) =>{
    return(
        <View className={styles.joins}>
            {
                joins.map((x,i)=>(
                    <TaskItem key={'join-'+i} submit={false} />
                ))
            }
        </View> 
    )
}

const Index = () =>{

    const [tab, setTab] = useState(1)


    // 一、请求加入的问卷列表
    const [tasks,setTasks] = useState([])
    useDidShow(async()=>{
        let res = await request({url:'/v1/admin/task/taskJoinList',method:'get',data:{page:1,limit:100,userName:getUser().user_name}})
        if (res instanceof Error)return
        let list = res.data
        setTasks(list)
    },[])

    // 二、请求参与的问卷列表
    const [joins,setJoins] = useState([])
    useDidShow(async()=>{
        let res = await request({url:'/v1/admin/questionaire/myParticipateQuestionaire',method:'get',data:{page:1,limit:100,userName:getUser().user_name}})
        if (res instanceof Error)return
        let list = res.data
        setJoins(list)
    })

    return (
        <View className={styles.index}>
            <Tabs className={styles.tabs} value={tab} onChange={x=>setTab(x)}>
                <View className={styles.tasks}>
                  {tab==1?<Submits tasks={tasks} />:<Joins joins={joins} />}
                </View>
                <Tail />
            </Tabs>
            <Tabbar index={1}></Tabbar>
        </View>
    )
}

export default Index