/**
 * 请求方法封装
*/
import Taro from '@tarojs/taro'
import { getUser} from '@/common/user'
import {consts} from '@/common/enum'
import {file_url,server_url} from '@/config'


let loading = 0

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
    const {
        data,
        method = 'POST',
        showToast = false,
        autoLogin = true,
        showLoading = true
    } = options

    let {
        url
    } = options

    url = url.replace(/^\/v1/, server_url)
    url = url.replace(/^\/file/, file_url)

    const { token } = getUser()
    const header = token
        ? {
            'Authorization': token
        }
        : {}
    if (method === 'POST') {
        header['content-type'] = 'application/json;charset=utf-8'
    }

    const slp = async x =>{
        return new Promise(r=>{
            setTimeout(r,x)
        })
    }

    const shToast = async x => {
        if (showToast){
            await Taro.showToast({icon:'none',...x})
            await slp(1000)
        }
    }

    if (showLoading){
        loading ++
        if (loading == 1){
            Taro.showLoading({
                title:'加载中'
            })
        }
    }

    let res = await Taro
        .request({url, method, data, header})
        .then(async (res) => {
            if (res.data instanceof Object){
                const { code, data, msg} = res.data 
                if (+code === consts.CurdStatusOkCode){
                    return data
                }
                // token 相关 
                if (+code === consts.StatusUnauthorized){
                    await shToast({title:'未鉴权'})
                    Taro.reLaunch({url:'/packageUser/pages/login/index'})
                }else if (+code === consts.JwtTokenInvalid){
                    await shToast({title: '无效的token'})
                    Taro.reLaunch({url:'/packageUser/pages/login/index'})
                }else if (+code === consts.JwtTokenExpired){
                    await shToast({title: '过期的token'})
                    Taro.reLaunch({url:'/packageUser/pages/login/index'})
                }else if (+code === consts.JwtTokenFormatErrCode){
                    await shToast({title: 'token格式错误'})
                    Taro.reLaunch({url:'/packageUser/pages/login/index'})
                }else{
                    shToast({title: msg||""})
                }
                return new Error()
            }else{
                const {statusCode, data, errMsg} = res
                if (statusCode&&statusCode != consts.CurdStatusOkCode){
                    shToast({title: `${data}`})
                    return new Error()
                }
            }
        }).catch(({errMsg})=>{
            shToast({title: `${errMsg}`})
            return new Error()
        })
        
    if(showLoading){
        loading --
        if (loading == 0){
            Taro.hideLoading()
        }
    }
    return res
}
