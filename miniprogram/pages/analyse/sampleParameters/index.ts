// pages/analyse/samplingParameters.ts
import { createStoreBindings } from "mobx-miniprogram-bindings";
import {apiGetSamplingParameters,apiSetSamplingParameters} from '@http/api/sampling'
import { store } from '@store/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bTcd:false,
    ch0Time:'',
    ch1Time:'',
    ch2Time:'',
    loading:false
  },
  // 热导极性
  thermalChange(e){
    this.setData({
      bTcd:e.detail
    })
  },
  cancel(){
    wx.navigateBack()
  },
  // 设置采样参数详
  async submit(){
    if(this.data.loading) return
    this.setData({
      loading:true
    })
    wx.showLoading({
      title: '加载中',
    })
    const {bTcd,ch0Time,ch1Time,ch2Time} = this.data
    const params = {
      bTcd,
      ch0Time,
      ch1Time,
      ch2Time
    }
    try {
      await apiSetSamplingParameters(params);
      wx.showToast({
        icon:"success",
        title:"提交成功"
      })
      this.cancel()
    } catch (error) {
      console.log(error)
    }finally{
      wx.hideLoading()
      this.setData({
        loading:false
      })
    }
  },
  // 采集时间input框change事件
  onChange({currentTarget:{dataset:{key}},detail}){
    this.setData({
      [key]:detail
    })
  },
  // 获取采样参数详情-回填
  async getDetail(){
    try {
      const res:{} = await apiGetSamplingParameters();
      this.setData(res)
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store:store, // 需要绑定的数据仓库
      fields: {currentRobot:'currentRobot'}, // 将 this.data.list 绑定为仓库中的 list ，即天气数据
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

  }
})