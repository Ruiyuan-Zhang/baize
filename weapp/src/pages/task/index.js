import {View} from '@tarojs/components'
import { useState } from 'react'
import Tail from '@/components/Tail'
import Tabbar from '@/components/Tabbar'
import Tabs from './components/Tabs'
import TaskItem from './components/TaskItem'
import styles from './index.module.less'

const Submits = () =>{
    return(
        <View className={styles.submits}>
            <TaskItem />
            <TaskItem />
        </View>
    )
}

const Joins = () =>{
    return(
        <View className={styles.joins}>
            <TaskItem submit={false} />
            <TaskItem submit={false} />
            <TaskItem submit={false} />
            <TaskItem submit={false} />
            <TaskItem submit={false} />
        </View> 
    )
}

const Index = () =>{

    const [tab, setTab] = useState(1)

    return (
        <View className={styles.index}>
            <Tabs className={styles.tabs} value={tab} onChange={x=>setTab(x)}>
                <View className={styles.tasks}>
                  {tab==1?<Submits />:<Joins />}
                </View>
                <Tail />
            </Tabs>
            <Tabbar index={2}></Tabbar>
        </View>
    )
}

export default Index