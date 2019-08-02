let ajaxTimes = 0

export const request = (params) => {
    ajaxTimes++;
    // 显示加载
    wx.showLoading({ title: '加载中', })
    // 公共的接口前缀
    const baseUrl = "https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading()
                    // console.count('当前执行次数')
                }

            }
        });
    })
}