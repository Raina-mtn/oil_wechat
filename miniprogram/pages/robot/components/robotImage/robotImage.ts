// pages/robot/components/robotImage/robotImage.ts
import {apiGetRealTimePicture} from '@http/api/robot'
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
  observers: {
    'currentRobot': async function(currentRobot) {
      if(currentRobot){
        // this.getImage()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading:false,
    img:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getImage(){
      this.setData({loading:true})
      try {
        const img =  await apiGetRealTimePicture()
        this.setData({img,loading:false})
      } catch (error) {
        console.log('error',error)
        this.setData({img:{},loading:false})
      }
    }
  },
})