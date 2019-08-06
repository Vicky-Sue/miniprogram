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
      goodsAddress:'',
      // 收货人名
      receiver:'',
      // 收货人电话
      receTelNumber:''
  },
  onLoad(options) {

  },
  // 添加收货地址
  handleChooseAddress() {
    wx.getSetting({
      success: (result1) => {
        console.log(result1,'result1')
        const scopeAddress=result1.authSetting['scope.address'];
        // 判断用户的授权状态
        if(scopeAddress===true || scopeAddress===undefined){
          // 直接获取用户的收获地址
          wx.chooseAddress({
            success: (result2) => {
              console.log(result2,'result2'); 
              const goodsAddress= result2.provinceName+result2.cityName+result2.countyName+result2.detailInfo;
              const receiver = result2.userName;
              const receTelNumber = result2.telNumber;
              this.setData({ goodsAddress, receiver, receTelNumber })
              console.log(goodsAddress,receiver,receTelNumber);
            },
          });       
        }else{
          // 诱导客户打开授权页面
          wx.openSetting({
            success: (result3) => {
              console.log(result3,'result3')
              wx.chooseAddress({
                success: (result4) => {
                  console.log(result4,'result4'); 
                  const goodsAddress= result2.provinceName+result2.cityName+result2.countyName+result2.detailInfo;
                  const receiver = result2.userName;
                  const receTelNumber = result2.telNumber;
                  this.setData({ goodsAddress, receiver, receTelNumber })
                },
              });                
            },
          });  
        }
        
       },
    });
  }

})