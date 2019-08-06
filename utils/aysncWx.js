/* 封装异步操作 */
/****
 * promise 形式的wx.getSetting 获取授权状态
 */
export const getSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

/****
 * promise 形式的wx.openSetting 打开授权页面
 */
export const openSetting = ()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}

/****
 * promise 形式的wx.chooseAddress 选择用户地址
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    })
}

/****
 * promise 形式的wx.showToast 提示用户
 */
export const showToast=function(){
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: '',
            icon: 'success',
            mask: true,//遮罩-避免客户持续点击，等遮罩消失才可以继续点击
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
          
    } )
}