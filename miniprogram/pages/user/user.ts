// pages/user/user.ts
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '@store/user'
import { store as tabbarStore } from '@store/tabbar'
import {getUser} from '@utils/token'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfomation:{}
  },
  // 退出登录
  submit(){
    Dialog.confirm({
      selector:'#van-dialog',
      title: '提示',
      message: '是否退出当前账号？',
    })
      .then(() => {
        this.logout()
        wx.redirectTo({url:'/pages/login/login'})
      })
      .catch(() => {
        // on cancel
      });
  },

  // 个人信息编辑
  goInfoEdit(){
    wx.navigateTo({
      url:'./info/index'
    })
  },
  //修改密码跳转
  changePassword(){
    wx.navigateTo({
      url:'/pages/user/changePassword/changePassword'
    })
  },
  //个人信息编辑跳转
  modifyInfo(){
    wx.navigateTo({
      url:'/pages/user/editUser/editUser'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      actions: ['logout','getUserInfo'], // 将 this.setList 绑定为仓库中的 setList action
    })
    this.tabbarStoreBindings = createStoreBindings(this, {
      store:tabbarStore, // 需要绑定的数据仓库
      actions: ['roleChange'], // 将 this.setList 绑定为仓库中的 setList action
    })
    const userInfomation = getUser()
    this.setData({
      userInfomation
    })
  },
  async reloadUserInfo(){
    await this.getUserInfo()
    const userInfomation = getUser()
    this.setData({
      userInfomation
    })
    this.roleChange()
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