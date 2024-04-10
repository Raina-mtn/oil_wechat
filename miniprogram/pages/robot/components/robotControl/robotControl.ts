// pages/robot/components/robotControl/robotControl.ts
import {apiControlRobotShell,apiControlPileShell,apiTerminateTask,apiCharge,apiControlLock,apiControlLight} from '@http/api/robot'
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
      type:Object||null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollapse:true,//展开收起
    isLight:true,// 补光灯 true-打开 false-关闭
    isLock:true,// 自锁 true-打开 false-关闭
    robotShell:true,// 机器人罩壳 true-打开 false-关闭
    pileShell:true,// 取油桩罩壳 true-打开 false-关闭
    lightNum:5,//补光灯亮度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //展开收起
    change(){
      const isCollapse = !this.data.isCollapse
      this.setData({isCollapse})
    },
    // 补光灯
    async setLight(){
      const isLight = this.data.isLight
      try {
        await apiControlLight({brightness:isLight?0:155})//155-打开，0-关闭
        this.setData({isLight:!isLight})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 自锁
     async setLock(){
      const isLock = this.data.isLock
      try {
        await apiControlLock({locking:isLock?1:0})//0-打开，1-关闭
        this.setData({isLock:!isLock})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 增加补光灯 5 55 105 155 205 255
    async plusLight(){
      const lightNum = this.data.lightNum
      console.log('lightNum',lightNum)
      let newLightNum
      if(lightNum===255){
        newLightNum = 255
      }else{
        newLightNum = lightNum+50
      }
      try {
        await apiControlLight({brightness:newLightNum})
        this.setData({lightNum:newLightNum})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 减少补光灯 5 55 105 155 205 255
    async minusLight(){
      const lightNum = this.data.lightNum
      let newLightNum
      if(lightNum===5){
        newLightNum = 5
      }else{
        newLightNum = lightNum-50
      }
      try {
        await apiControlLight({brightness:newLightNum})
        this.setData({lightNum:newLightNum})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 机器人罩壳
    async controlRobotShell(){
      const robotShell = this.data.robotShell
      try {
        await apiControlRobotShell({action:robotShell?1:0})
        this.setData({robotShell:!robotShell})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 取油桩罩壳
    async controlPileShell(){
      const pileShell = this.data.pileShell
      try {
        await apiControlPileShell({action:pileShell?1:0})
        this.setData({pileShell:!pileShell})
      } catch (error) {
        console.log('error',error)
      }
    },
    // 一键终止
    async terminateTask(){
      try {
        await apiTerminateTask()
      } catch (error) {
        console.log('error',error)
      }
    },
    // 一键充电
    async charge(){
      try {
        await apiCharge()
      } catch (error) {
        console.log('error',error)
      }
    },
  }
})