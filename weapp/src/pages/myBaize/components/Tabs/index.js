import {View } from '@tarojs/components'
import styles from './index.module.less'

const Index = ({children, onChange, value=1}) =>{


    const change = i =>{
        if (i != value){
            onChange&&onChange(i)
        }
    }

    return (
        <View className={styles.index}>
            <View className={styles.tabs}>
                <View className={styles.tab + ' ' + (value==1?styles.on:'')}
                  onClick={()=>change(1)}
                >
                    规则
                    <View className={styles.line}></View>
                </View>
                <View className={styles.tab + ' ' + (value==2?styles.on:'')}
                  onClick={()=>change(2)}
                >
                    查看明细
                    <View className={styles.line}></View>
                </View>
            </View>
            <View className={styles.content}>{children}</View>
        </View> 
    )
}

export default Index