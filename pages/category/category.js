// pages/category/category.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { setStorageCate, getStorageCate } from '../../utils/storage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧产品列表
    rightGoodsList: [],
    // 选中的当前索引
    currentIndex: 0,
    // 设置竖向滚动条位置	
    scrollTop: 0
  },
  // 接口的返回值 数组格式
  // 小程序中不建议把没有必要的数据定义在data中，因为内部会把data中的所有的数据都会传递到
  // 视图层 wxml，容易导致页面特别卡 
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 1 获取缓存的数据 用来判断有没有缓存数据
    const category = getStorageCate();
    console.log(category, 'getStorageCate');
    // 2 判断有没有缓存数据
    if (!category) {
      // 没有数据 1 发送请求 2 存入到缓存 
      this.getCategories();
    } else {
      // 有缓冲数据 
      // 判断数据是否过期 假设过期时间是10s
      if (Date.now() - category.time > 1000 * 10) {
        // 过期了 
        console.log('过期了')
        this.getCategories();
      } else {
        // 获取缓存的数据
        const categoryData = category.data;
        // 给全局数据进行赋值
        this.cates = categoryData;
        // 左侧菜单要的数据
        const leftMenuList = this.cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
        // 右侧大家店的数据
        const rightGoodsList = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }
    }
  },
  // 获取分类数据
  async getCategories() {
    const result = await request({ url: "/categories" })
    // console.log(result)
    // 把接口数据赋值给全局变量
    this.cates = result;
    // 把数据存入到缓存中
    setStorageCate({ time: Date.now(), data: this.cates })
    const category = getStorageCate();
    console.log(category, 'setStorageCate');

    // 左侧菜单要的数据
    const leftMenuList = this.cates.map(v => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
    // 右侧大家店的数据
    const rightGoodsList = this.cates[0].children;
    this.setData({
      leftMenuList,
      rightGoodsList
    })

  },
  handleMenuChange(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset;
    const rightGoodsList = this.cates[index].children;
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    })
  }
})