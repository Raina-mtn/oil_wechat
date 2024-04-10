// pages/analyse/components/gas/index.ts
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

  /**
   * 组件的初始数据
   */
  data: {

  },
  computed:{
    gasList(){
      return [
        {
          label:'载气1',
          icon:'icon-ic_analysis_zaiqi2',
          unit:'MPa',
          color:'#9094F7',
          key:'fzaiQi'
        },
        {
          label:'载气2',
          icon:'icon-ic_analysis_zaiqi2',
          unit:'MPa',
          color:'#10C8C3',
          key:'fzhuQian'
        },
        {
          label:'氢气',
          icon:'icon-ic_analysis_h2',
          unit:'MPa',
          color:'#5B9FFF',
          key:'fqingQi'
        },
        {
          label:'空气',
          icon:'icon-ic_analysis_air',
          unit:'MPa',
          color:'#FF767F',
          key:'fkongQi'
        },
      ]
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})