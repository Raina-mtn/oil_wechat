import { observable, action } from 'mobx-miniprogram'
import {apiGetLatestChromatogram} from '@http/api/analyse'


// 数据仓库-图表
export const useChartStore = observable({
  chartList:[], // 图谱分析展示的图表list
  enlargeChartData:{},//放大的图表
  // 登录
  getChartList: action(async function () {
    const res = await apiGetLatestChromatogram()
    this.chartList = res
    return res
  }),
  setEnlargeChartData:action(async function (data) {
    this.enlargeChartData = data
  }),
})