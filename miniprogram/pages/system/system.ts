// pages/system/system.ts
Page({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  onClickUnit(){
    wx.navigateTo({
      url: '/pages/system/unitmanage/unit'
    })
  },
  onClickRobot(){
    wx.navigateTo({
      url: '/pages/system/robotmanage/robot'
    })
  },
  onClickDevice(){
    wx.navigateTo({
      url:'/pages/system/devicemanage/device'
    })
  },
  onClickUser(){
    wx.navigateTo({
      url:'/pages/system/usermanage/user'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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