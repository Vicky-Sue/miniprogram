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
    goodsList:[]
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
    console.log(options)
    this.queryParams.cid = options.cid;
    this.getGoodsList()
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
          goodsList:result.goods
        })
      })
  }
})