// 会封装所有的项目中用到了本地存储的代码

/**
 * 设置分类商品数据到本地存储中
 * @param {object} obj 要存入的分类商品数据对象
 */
export const setStorageCate = (obj) => {
    wx.setStorageSync("category", obj)
  }
  
  /**
   * 获取本地存储的分类商品数据
   */
  export const getStorageCate = () => {
    return wx.getStorageSync("category");
  }


/**
 * 把购物车存入到缓存中
 * @param {object} cart 要存入的购物车对象
 */
export const setStorageCart = (cart) => {
    wx.setStorageSync("cart", cart);
  }
  
  /**
   * 获取缓存中的购物车数据
   */
  export const getStorageCart = () => {
    return wx.getStorageSync("cart");
  }