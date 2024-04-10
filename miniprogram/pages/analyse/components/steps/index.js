// pages/cssCase/stepsMore/index2.js
import {apiGetTaskDetail} from '@http/api/analyse'
import { store } from '@store/user'
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    //1已完成 0 当前步骤 -1 未开始
    list: [
      {
        status: -1,
        text: "对接",
      },
      {
        status: -1,
        text: "自检",
      },
      {
        status: -1,
        text: "升温",
      },
      {
        status: -1,
        text: "点火",
      },
      {
        status: -1,
        text: "桥流",
      },
      {
        status: -1,
        text: "稳定",
      },
      {
        status: -1,
        text: "进样",
      },
      {
        status: -1,
        text: "分析",
      },
      {
        status: -1,
        text: "实验结束",
      },
    ],
    currentStep:0
  },
  ready(){
    this.getProcess()
  },
  /**
   * 组件的方法列表
  */
  methods: {
    async getProcess(){
      const workstationId = store.currentRobot?.workstationId
      if(workstationId){
        try {
          const data = await apiGetTaskDetail({workstationId})
          if(!data) return
          const {processState,taskState} = data
          let steps = this.data.list
          if(taskState){
            for(let i = 0;i<processState-1;i++){
              steps[i].status = 1
            }
            steps[processState-1].status = 0
            this.setData({list:steps,currentStep:processState})
          }else{
            const list = steps.map(i=>{
              i.status=-1
              return i
            })
            this.setData({list})
          }
        } catch (error) {
          console.log(error)
        }
      }

    }
  },
})