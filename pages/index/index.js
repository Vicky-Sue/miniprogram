// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
  },
  // 获取轮播图数据
  getSwiperList(){
    var reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result)
        this.setData({
          swiperList:result.data.message
        })
      },
    });
      
  }

})