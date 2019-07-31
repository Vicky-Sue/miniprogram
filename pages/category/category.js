// pages/category/category.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧产品列表
    rightGoodsList:[],
    // 选中的当前索引
    currentIndex:0,
    // 设置竖向滚动条位置	
    scrollTop:0
  },
  // 分类总数据
  cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories()
  },
  // 获取分类数据
  getCategories(){
    request({url:"/categories"})
    .then(result=>{
      console.log(result)
      this.cates=result;
      const leftMenuList=this.cates.map(v=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      const rightGoodsList=this.cates[0].children;
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  handleMenuChange(e){
    // console.log(e)
    const {index} = e.currentTarget.dataset;
    const rightGoodsList=this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightGoodsList,
      scrollTop:0
    })
  }
})