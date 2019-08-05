import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { setStorageCart, getStorageCart } from '../../utils/storage.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },
  // 全局的商品对象
  GoodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },
  // 获取商品的详情信息
  async getGoodsDetail(goods_id) {
    const result = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsObj = result;
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics: result.pics,
        // 全部替换 .webp ->  .jpg
        // goods_introduce: result.goods_introduce
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },
  // 加入购物车
  handleCartAdd() {
    let cart = getStorageCart()||{};
    if (cart[this.GoodsObj.goods_id]) {
      cart[this.GoodsObj.goods_id].num++;
    } else {
      // 把GoodsObj的值赋值给goods_id，goods_id为键，GoodsObj为值
      cart[this.GoodsObj.goods_id] = this.GoodsObj;
      // 添加商品数量的键
      cart[this.GoodsObj.goods_id].num = 1;
    }
    setStorageCart(cart)
    console.log(this.GoodsObj)
    console.log(cart)
    wx.showToast({
      title: '加入购物车+1',
      icon: 'success',
      mask: true,
    });

  }


})