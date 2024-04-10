// pages/analyse/components/chart.ts
import * as echarts from '../../../../components/ec-canvas/echarts';
const {chartOption} = require('@utils/chart');
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    chartId:{
      type:Number,
      value:0
    },
    chartData:{
      type:Object,
      value:null,
      observer: function (val) {
        this.getData()
        // console.log('val',val)
        // console.log('this.data.chart',this.data)
        // this.data.chart && this.data.chart.setOption({
        //   backgroundColor: "#ffffff",
        //   series: [{
        //     label: {
        //       normal: {
        //         fontSize: 14
        //       }
        //     },
        //     type: 'pie',
        //     center: ['50%', '50%'],
        //     radius: ['20%', '40%'],
        //     data: [{
        //       value: 55,
        //       name: '北京'
        //     }, {
        //       value: 20,
        //       name: '武汉'
        //     }, {
        //       value: 10,
        //       name: '杭州'
        //     }, {
        //       value: 20,
        //       name: '广州'
        //     }, {
        //       value: 38,
        //       name: '上海'
        //     }]
        //   }]
        // })
      },
    }
  },
  computed:{
    option(data){
      return chartOption(data.chartData)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    chart:null,//chart实例
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(){
      this.echartsComponnet = this.selectComponent(`#mychart-dom-bar-${this.data.chartId}`);
      this.echartsComponnet.init((canvas, width, height,dpr) => {
        // 初始化图表
        const Chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });
        Chart.setOption(this.data.option);
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return Chart;
        
      });
    },
  },
  ready() {
    // this.getData(); //获取数据
  },
  detached(){
    // if (this.data.chart) {
    //   this.data.chart.dispose();
    // }
  }
})