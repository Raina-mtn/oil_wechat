// pages/task/components/taskItem/taskItem.ts
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:''
    },
    checkIndex:{
      type:[undefined,Number],
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