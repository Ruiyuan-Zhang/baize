import { View, Button,Image } from '@tarojs/components'
import { AtImagePicker, AtInput, AtIcon } from 'taro-ui'
import NavBar from '@/components/NavBar'
import styles from './index.module.less'
import { useState } from 'react'
import { vibrateShort } from '@tarojs/taro'


const Index = () =>{
    const [datas,setDatas] = useState([
        [
            {title:'请输入含有手写数字的图片',type:'image',englishName:'image'},
            {title:'请输入图片中的数字',type:'int',englishName:'value'}
        ],
    ])

    const onChangeLocalData = ({dataIndex,index,value}) =>{
        console.log({dataIndex,index,value})
        let ds = [...datas]
        ds[dataIndex][index].value=value
        setDatas(ds)
    }

    // 再添加一条本地数据
    const addMoreData = () =>{
        setDatas([
            ...datas,
            [
                {title:'请输入含有手写数字的图片',type:'image',englishName:'image'},
                {title:'请输入图片中的数字',type:'int',englishName:'value'}
            ]
        ])
    } 

    // 删除一条本地数据
    const delLocalData = i =>{
        setDatas([
            ...datas.splice(i,1)
        ])
    }

    // 每一组数据
    const Lines = ({dataIndex,lines}) =>{
        return (
            lines.map(({title,type},i)=>(
                <View key={i} className={styles.line}>
                    <View className={styles.title}
                      onClick={()=>{
                          console.log({dataIndex,i})
                        }}
                    >
                        {title}
                    </View>
                    {type=='image'
                    ?<AtImagePicker 
                        name={'images-'+dataIndex+'-'+i}
                        files={lines[i].value}
                        onChange={fs=>onChangeLocalData({
                            dataIndex,
                            index:i,
                            value:fs
                        })}
                    />
                    :<AtInput 
                        name={'input-'+dataIndex+'-'+i}
                        value={datas[dataIndex][i].value}
                        onChange={v=>onChangeLocalData({
                            dataIndex,
                            index:i,
                            value:v
                        })}
                    />}
                    
                </View>
            ))
        )
    }

    return (
        <View className={styles.index}>
            <NavBar title='添加本地数据' />
            <View className={styles.datas}>
                {
                    datas.map((lines,dataIndex)=>(
                        <View key={dataIndex} className={styles.data}>
                            <AtIcon size='18' value='close' color='red' 
                              onClick={()=>{
                                delLocalData(dataIndex)
                              }}
                            />
                            <Lines dataIndex={dataIndex} lines={lines} />
                        </View>
                    ))
                }
            </View>
            <Button className={styles.add} type='primary' onClick={addMoreData}>
                <Image src='https://zhangruiyuan.oss-cn-hangzhou.aliyuncs.com/picGo/images/20211105021700.png'></Image>
                添加更多数据
            </Button>
        </View>
    )
}

export default Index