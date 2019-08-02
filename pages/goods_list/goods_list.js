// pages/goods_list/goods_list.js
import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, title: '综合', isActive: true },
      { id: 1, title: '销量', isActive: false },
      { id: 2, title: '价格', isActive: false }
    ],
    // 页面要渲染的商品数组
    goodsList: []
  },
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 计算总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  // 页面开始加载就触发
  // 它的形参可以获取到url上的参数
  onLoad: function (options) {
    // console.log(options)
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },
  // 子组件触发的事件
  handleItemChange(e) {
    // console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  // 获取商品列表搜索数据
  getGoodsList() {
    request({ url: '/goods/search', data: this.queryParams })
      .then(result => {
        // 计算总页数
        console.log(result)
        this.totalPages = Math.ceil(result.total / this.queryParams.pagesize)
        this.setData({
          // 拼接商品下拉数据
          goodsList: [...this.data.goodsList, ...result.goods]
        })
        wx.stopPullDownRefresh();
      })
  },
  //监听用户上拉触底事件
  onReachBottom() {
    // console.log('监听用户上拉触底事件')
    if (this.queryParams.pagenum >= this.totalPages) {
      // console.log('没有下一页数据')
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none',
      });

    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.queryParams.pagenum = 1;
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }
})