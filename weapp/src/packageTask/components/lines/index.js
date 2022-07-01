import {View} from '@tarojs/components'
import { useState } from 'react'
import {AtImagePicker,AtInput,AtForm} from 'taro-ui'
import styles from './index.module.less'

// 每一组数据
const Lines = ({id, dataFormat={}, onChange}) =>{
    const [data, setData] = useState({})
    
    return (
        <View className={styles.lines}>
            {dataFormat.map(({title,type,englishName},i)=>(
                <View key={i} className={styles.line}>
                    <View className={styles.title}>{title}</View>
                    {type=='image'
                    ?<AtImagePicker 
                        name={id+'-picker-'+i}
                        files={data[englishName]}
                        onChange={files=>{
                            let d = {...data}
                            d[englishName] = files
                            setData(d)
                            onChange&&onChange(d)
                      }}
                    />
                    :<AtInput 
                        name={id+'-input-'+i}
                        value={data[englishName]}
                        onChange={x=>{
                            let d = {...data}
                            d[englishName]=x
                            setData(d)
                            onChange&&onChange(d)
                        }}
                    />}
                    
                </View>
            ))}
        </View>
    )
}

export default Lines