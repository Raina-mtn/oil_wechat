import * as echarts from '../../../components/ec-canvas/echarts';
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { useChartStore } from '@store/chart'
const {chartOption} = require('@utils/chart');

Page({
  onShareAppMessage: function () {

  },
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    }
  },
  exitLarge(){
    wx.navigateBack()
  },
  onReady() {
    
  },
  onLoad(){
    this.storeBindings = createStoreBindings(this, {
      store:useChartStore, // 需要绑定的数据仓库
      fields: {chartData:"enlargeChartData"}, // 将 this.data.list 绑定为仓库中的 list ，即天气数据
    })
    this.echartsComponnet = this.selectComponent(`#mychart-larges`);
    this.getData(); //获取数据
  },
  getData(){
    this.echartsComponnet.init((canvas, width, height,dpr) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      const options = chartOption(this.data.chartData) 
      Chart.setOption(options);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
});
