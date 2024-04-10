// pages/analyse/calParameters/parametersItem/index.ts
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
    parameterItem:{
      type:Object,
      value:{}
    }
  },
  computed:{
    parameterList(){
      return [
        {
          label:'浓度(ul/L)：',
          key:"amount"
        },
        {
          label:'保留时间(min)：',
          key:"thetime"
        },
        {
          label:'峰高(uv)：',
          key:"high1"
        },
        {
          label:'峰面积(uv*s)：',
          key:"sqr"
        },
        {
          label:'峰高校正因子：',
          key:"highCorr"
        },
        {
          label:'峰面积校正因子：',
          key:"sqrCorr"
        },
     
      ]
    },
    iconSrc(data){
      let src = ''
      switch (data.parameterItem.name) {
        case 'CO':
          src = 'ic_co'
          break;
        case 'CH4':
          src = 'ic_ch4'
          break;
        case 'C2H2':
          src = 'ic_c2h2'
          break;
        case 'C2H4':
          src = 'ic_c2h4'
          break;
        case 'CO2':
          src = 'ic_co2'
          break;
        case 'H2':
          src = 'ic_h2'
          break;
      
        default:
          break;
      }
      return `/assets/images/${src}.png`
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