// pages/analyse/components/temperature/temperature.ts
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Object
    }
  },
  computed:{
    temperatureList(){
      return [
        {
          label:'进样',
          key:'fjinYang',
          setpoint:66
        },
        {
          label:'定油',
          key:'fdingYou',
          setpoint:66
        },
        {
          label:'热导',
          key:'ftcd',
          setpoint:66
        },
        {
          label:'氢焰',
          key:'ffid',
          setpoint:66
        },
        {
          label:'脱油',
          key:'ftuoYou',
          setpoint:66
        },
        {
          label:'转化',
          key:'fzhuanHua',
          setpoint:66
        },
      ]
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

  }
})