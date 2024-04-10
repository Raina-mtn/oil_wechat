// pages/robot/robot.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '@store/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    robotSelectShow:false
  },
  // 更换机器人
  async change(){
    this.setData({
      robotSelectShow: true
    });
    await this.getRobotList()
  },
  // 更多图片
  moreImage(){
    wx.navigateTo({
      url: '/pages/robot/robotImage/robotImage'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot','robotList','userInfo'],
      actions:['getRobotList','setCurrentRobot','getCurrentRobot']
    })
    await this.getRobotList()
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
    this.getTabBar().init();
    this.getRobotList()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.selectComponent("#robotInfo").clearTimer()
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