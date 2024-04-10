// pages/analyse/dataManage/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:"record"
  },

  onChange(event){
    this.setData({
      active:event.detail.name
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
  onReachBottom(){
    // 历史记录滚动底部加载更多
    if(this.data.active === 'record'){
      const historyDom = this.selectComponent('#record')
      historyDom.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },



})