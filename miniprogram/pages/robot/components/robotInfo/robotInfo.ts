// pages/robot/components/robotInfo.ts
import {robotStateObj} from '@enum/config'
import {apiGetTaskInfo} from '@http/api/robot'
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentRobot:{
      type:Object||null,
      observer(newVal,oldVal) {// 数据监听
        const {workstationId} = newVal
        if(workstationId){
          clearInterval(this.data.timer)
          this.getInfo()
          // 机器人状态 10s 轮询 每次监听到机器人修改则重新调用
          const timer = setInterval(()=>{
            this.getInfo()
          },1000*10)
          this.setData({timer})
        }
      },
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    robotStateObj,
    taskInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goAnalyse(){
      wx.switchTab({
        url:'/pages/analyse/analyse'
      })
    },
    async getInfo(){
      const taskInfo = await apiGetTaskInfo()
      this.setData({taskInfo})
    },
    clearTimer(){
      clearInterval(this.data.timer)
    }
  },
})