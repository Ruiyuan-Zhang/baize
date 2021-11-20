import Taro from '@tarojs/taro'
import { getData,saveData } from '@/common/data'
import { ifImageCategory } from '@/train/utils'


// 将本地临时文件保存为本地缓存文件（可读不可写）
const tmpFile2localCacheFile = async url =>{
    let fs = Taro.getFileSystemManager()
    let savedFilePath = await fs.saveFileSync(url)
    return savedFilePath
}

/**
 * 为了方便用户能够一次输入多组数据，我们支持用户在{image,value}设定下，同时输入多组image
 * 但是本函数需要进行一些转换
 */
const transformDatas = async (task, datas) =>{
    if (task&&task.dataFormats){
        // 图片分类任务
        if(ifImageCategory(task)){
            let nds = []
            for (let i =0;i<datas.length;i++){
                for (let j=0;j<datas[i].image.length;j++){
                    let image = await tmpFile2localCacheFile(datas[i].image[j].url)
                    nds.push({
                        image,
                        value:datas[i].value
                    })
                }
            }
            return nds
        }
    }
    return datas
}


/**
 * 将新的数据集保存在微信小程序的本地文件中
 */
const save = async (task={}, datas=[]) =>{

    // 先对数据进行格式化，获取要存储的文件
    let nds = await transformDatas(task, datas)
    console.log(nds)

    // 找到本地的数据文件（目录）
    let localData = getData()  // 本地存放的数据文件
    console.log(localData)
    let { tasks } = localData 

    // 修改本地目录，将originTask添加到data中
    let ifHave = false 
    for (let i=0;i<tasks.length;i++){
        if (tasks[i].id == task.idStr){
            tasks[i].list = [...tasks[i].list,...nds]
            ifHave = true
            break 
        }
    }
    if (!ifHave)tasks.push({
        id:task.idStr,
        list:nds
    })
    saveData({
        ...localData,
        tasks
    })
}

export default save