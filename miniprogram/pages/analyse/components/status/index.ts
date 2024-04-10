// pages/analyse/components/status/index.ts
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
    statusList(){
      return [
        {
          label:'气瓶压力',
          key:'robotPressure',
          unit:'MPa'
        },
        {
          label:'抽真空压力',
          key:'robotVacuum',
          unit:'MPa'
        },
        {
          label:'水位',
          key:'robotWaterLevel',
          unit:'mm'
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