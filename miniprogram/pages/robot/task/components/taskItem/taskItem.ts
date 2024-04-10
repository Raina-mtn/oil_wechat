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
      value:'任务名称XXXX'
    },
    checkIndex:{
      type:[null,Number],
      value:null
    },
    index:{
      type:Number,
      value:null
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