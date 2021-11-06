import * as tf_core from '@tensorflow/tfjs-core'
import * as tf_layers from '@tensorflow/tfjs-layers'
import { resize }  from '../../utils/image_tools'

const predict = async ({width,height, image, modelUrl}) =>{
    // 1 转换图片
    let {data} = await resize({width,height,src:image})
    data = data.filter((v,i)=>i%4===0)
    data = data.map(v=>v/255)
    data = Float32Array.from(data)   // tensor1d 支持的数据类型为 'float32'|'int32'|'bool'|'complex64'|'string'
    data = tf_core.tensor2d(data,[1,784])
    console.log(data)

    // 2 获取在线模型
    let model = await tf_layers.loadLayersModel(modelUrl)
    model.summary()

    // 3 返回结果
    let preY = model.predict(data)
    preY.print()
    preY = preY.dataSync()
    preY = preY.indexOf(Math.max(...preY))
    return preY
}

export default predict