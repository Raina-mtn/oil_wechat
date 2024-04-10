// pages/chromatography/chromatography.ts
import { createStoreBindings,updateStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'
import { useChartStore } from '@store/chart'
import {apiGetChromatogram} from '@http/api/analyse'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartData:[]
  },

  large({currentTarget:{dataset:{chart}}}){
    this.setEnlargeChartData(chart)
    wx.navigateTo({
      url: '/pages/analyse/large/index'
    })
  },
  goDataManage(){
    wx.navigateTo({
      url: '/pages/analyse/dataManage/index'
    })
  },
  // 获取图表数据
  async getStoreChartList(){
    try {
      await this.getChartList()
      this.storeBindings.updateStoreBindings()
      this.setData({
        chartData:this.data.chartList
      })
    } catch (error) {
      console.log(error)
      this.setData({
        chartData:[]
      })
    }
  },
    // 根据文件名获取谱图
  async getChromatogramData(params){
    try {
      const res = await apiGetChromatogram(params)
      this.setData({
        chartData:res
      })
    } catch (error) {
      console.log(error)
      this.setData({
        chartData:[]
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store:useChartStore, // 需要绑定的数据仓库
      fields: {chartList:'chartList'}, // 将 this.data.list 绑定为仓库中的 list ，即天气数据
      actions: ['getChartList','setEnlargeChartData'], // 将 this.setList 绑定为仓库中的 setList action
    })
    this.getStoreChartList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})