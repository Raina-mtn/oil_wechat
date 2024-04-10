// pages/system/robotmanage/robot.ts
import Toast from '@vant/weapp/toast/toast';
import {apiGetRobotList} from '@http/api/robot'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    currentCheck:null
  },
  addRobot:function(e){
   const type = e.currentTarget.dataset.type
   if(type==='edit'&&this.data.currentCheck===null){
    Toast('请选择需要编辑的记录！');
    return;
   }
   const currentCheck = JSON.stringify(this.data.currentCheck)
    wx.navigateTo({
      url:`/pages/system/robotmanage/addRobot/index?type=${type}&currentCheck=${currentCheck}`
    })
  },
  check(e){
    const item = e.currentTarget.dataset.item
    this.setData({
      currentCheck:item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getList()
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

  },
  async getList(){
    const res = await apiGetRobotList()
    this.setData({
      listData:res,
      currentCheck:null
    })
  }
})