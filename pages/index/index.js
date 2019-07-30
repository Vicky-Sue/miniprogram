// 引入封装好的接口代码
import { request } from "../../request/index.js"

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
  getSwiperList() {
    request({url: '/home/swiperdata'})
    .then(result=>{
        console.log(result)
        this.setData({
          swiperList: result
        })
    })


  }

})