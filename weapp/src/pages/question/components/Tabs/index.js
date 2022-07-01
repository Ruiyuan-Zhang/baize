import {View } from '@tarojs/components'
import styles from './index.module.less'

const Index = ({className, children, onChange, value=1}) =>{


    const change = i =>{
        if (i != value){
            onChange&&onChange(i)
        }
    }

    return (
        <View className={className + ' ' + styles.index}>
            <View className={styles.tabs}>
                <View className={styles.tab + ' ' + (value==1?styles.on:'')}
                  onClick={()=>change(1)}
                >
                    我发布的普通问卷
                    <View className={styles.line}></View>
                </View>
                <View className={styles.tab + ' ' + (value==2?styles.on:'')}
                  onClick={()=>change(2)}
                >
                    我参与的普通问卷
                    <View className={styles.line}></View>
                </View>
            </View>
            <View className={styles.content}>{children}</View>
        </View> 
    )
}

export default Index