// pages/analyse/parameters/index.ts
import {apiGetCalculationParameters} from '@http/api/analyse'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameterList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot'], // 将 this.data.list 绑定为仓库中的 list ，即天气数据
    })
    this.storeBindings.updateStoreBindings()
    this.getDetail()
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

  },
  // 获取计算参数详情
  async getDetail(){
    try {
      const res:any = await apiGetCalculationParameters()
      this.setData({
        parameterList:res
      })
    } catch (error) {
      console.log(error)
    }
  }
})