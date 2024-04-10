// pages/analyse/setParameters/index.ts
import {apiSetTemporary,apiSetBridge,apiGetTem,apiGetBridge} from '@http/api/analyse'
import { store } from '@store/user'
const ui = require('@utils/toast');
const computedBehavior = require("miniprogram-computed").behavior;
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    bridgeChecked:false,
    temporaryData:{
      fJinYang:0,//进样
      fDingYou:0,//定油
      fFid:0,//氢焰
      fTcd:0,//热导
      fTuoYou:0,//脱油
      fZhuanHua:0,//转化
    },
    bridgeData:{
      bTcd:true,//桥流保护,true-开启
      tcdValue:0,//桥流值,只能是整数
    },
  },
  computed:{
    temporaryList(){
      return [
        {
          label:'进样',
          key:'fJinYang'
        },
        {
          label:'定油',
          key:'fDingYou'
        },
        {
          label:'热导',
          key:'fTcd'
        },
        {
          label:'氢焰',
          key:'fFid'
        },
        {
          label:'脱油',
          key:'fTuoYou'
        },
        {
          label:'转化',
          key:'fZhuanHua'
        },
      ];
    }
  },
  async submit(){
    const {temporaryData,bridgeData} = this.data
    try {
      await apiSetTemporary({...temporaryData})
      await apiSetBridge({...bridgeData})
      ui.showToast('设置成功')
      wx.navigateBack()
    } catch (error) {
      console.log(error)
    }
  },
  cancel(){
    wx.navigateBack()
  },
  bridgeChange(e){
    this.setData({[`bridgeData.${e.currentTarget.dataset.key}`]:e.detail})
  },
  temporaryChange(e){
    this.setData({[`temporaryData.${e.currentTarget.dataset.key}`]:e.detail})
  },
  // 获取参数设置详情-回填
  async getDetail(){
    try {
      const temporaryData:{} = await apiGetTem();
      this.setData({temporaryData})
      const bridgeData:{} = await apiGetBridge();
      this.setData({bridgeData})
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
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