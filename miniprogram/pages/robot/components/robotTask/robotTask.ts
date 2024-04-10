// pages/robot/components/robotTask/robotTask.ts
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    workstationId:{
      type: String||null
    }
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
    goTask(){
      wx.navigateTo({
        url: '/pages/robot/task/task'
      })
    },
    goHistory(){
      wx.navigateTo({
        url: '/pages/robot/history/index?id=' + this.data.workstationId
      })
    },
  }
})