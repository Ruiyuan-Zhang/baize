import Taro from '@tarojs/taro'
import { ifImageCategory,ifValuesValue } from './utils'
import { imageCategory } from './train'

const init = () =>{
    console.log('训练所需的初始化')
    // 这里不用匿名函数，是因为，this指向匿名函数的外部对象
    global.FormData = function () {
        this.mp = {}
        this.append= (x,y) =>{
        this.mp[x] = y
        }
    }
    global.Blob = ( data, type) =>{
        if (type.type === 'application/octet-stream'){
            data = data.map(d=>Taro.arrayBufferToBase64(d))
            // data = Taro.arrayBufferToBase64(data)
        }
        console.log({data,type})
        return {data,type}
    }
}

/**
 * 本地训练入口
 * 返回训练完成之后的地址
 */
const train = async ({
    task, dataList, globalModelFile,
    onLoadModel,      // [回调] 成功下载远程的模型文件后
    onIndexEpochEnd,  // [回调] 一整轮本地数据训练
    onTrainEnd,       // [回调] 训练结束
    onModalSaveStart, // [回调] 模型开始保存到模型文件服务器之前
    onModalSaveEnd,   // [回调] 模型保存到模型文件服务器之后
}) =>{

    if (ifImageCategory(task)){
        // 图像分类任务
        let res = await imageCategory({dataList, globalModelFile, 
            onLoadModel,onIndexEpochEnd,onTrainEnd,
            onModalSaveStart, onModalSaveEnd,
        })
        return res
        
    }else if (ifValuesValue(task)){
        // values-value 形式的数据格式

    }else {
        console.log('不支持该形式的数据格式')
    }
}


export { init, train }