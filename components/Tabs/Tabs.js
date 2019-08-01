// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chilTabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleIndexChange(e){
      console.log(e)
      const {index}=e.currentTarget.dataset;
      // 触发父组件的自定义事件
      this.triggerEvent('itemChange',{index})
    }
  }
})
