// pages/task/components/taskItem/taskItem.ts
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    checkIndex:{
      type:[undefined,Number],
      value:undefined
    },
    index:{
      type:Number,
      value:undefined
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})