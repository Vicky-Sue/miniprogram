import { getSetting, openSetting, chooseAddress } from '../../utils/aysncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
import {setStorageAddress,getStorageAddress} from '../../utils/storage.js'
// 1 给 收货地址按钮 添加点击事件 
//   1 调用微信小程序自带 获取收货地址的api   wx.chooseAddress
//   2 正常流程
//     1 先调用 获取 用户对小程序的授权的 接口 有返回值 scope  存放 用户对该应用的权限信息
//     1 先调用 获取( wx.getSetting) 用户对小程序的授权的 接口 有返回值 scope  存放 用户对该应用的权限信息
//     2 对权限scope 进行判断
//       1 scope 可能是 undefined ： 用户从来没有点击过 收货地址按钮 
//         1 直接获取用户的收货地址 
//       2 scope 可能是 true ： 用户曾经给过应用 权限 
//         1 直接获取用户的收货地址
//       3 scope 可能是 false : 用户曾经点击 取消 授权
//         1 先打开用户 授权页面 让用户自己 重新授权
//         1 先打开用户 授权页面(openSetting) 让用户自己 重新授权
//         2 再去获取收货地址信息！！！

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收获地址
    address:{}
  },
  onLoad(options) {

  },
  // 添加收货地址
  async handleChooseAddress() {
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting['scope.address'];
    // 判断用户的授权状态
    if (scopeAddress === true || scopeAddress === undefined) {
      // 获取用户的收货地址
    } else {
      // 诱导客户打开授权页面
      await openSetting();
      // 获取用户的收货地址
    }
    const addressObj= await chooseAddress();
    addressObj.all=addressObj.provinceName + addressObj.cityName + addressObj.countyName + addressObj.detailInfo;
    setStorageAddress(addressObj)

  },
  onShow(){
    console.log(getStorageAddress())
    this.setData({ address:getStorageAddress()||{} })
  }
})