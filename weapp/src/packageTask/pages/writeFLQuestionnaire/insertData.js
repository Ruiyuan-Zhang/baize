import Taro from '@tarojs/taro'
import { getData,saveData } from '@/common/data'

/**
 * 将新的数据集保存在微信小程序的本地文件中
 */
const save = async (task={id:'-1'}, datas=[]) =>{
    console.log(datas)
    let nds = []
    for (let i =0;i<datas.length;i++){
        for (let j=0;j<datas[i][0].value.length;j++){

            let fs = Taro.getFileSystemManager()
            let savedFilePath = await fs.saveFileSync(datas[i][0].value[j].url)

            nds.push({
                image: savedFilePath,
                value: datas[i][0].value
            })
        }
    }



    let tasks = getData()

    // 将originTask添加到data中
    let ifHave = false 
    for (let i=0;i<tasks.length;i++){
        if (tasks[i].id == task.id){
            tasks[i].list = [...tasks[i].list,...nds]
            ifHave = true
            break 
        }
    }
    if (!ifHave)tasks.push({
        id:task.id,
        list:nds
    })
    console.log(tasks)

    saveData(tasks)

    Taro.navigateTo({url:'/pages/Results/index'})
}

export default save