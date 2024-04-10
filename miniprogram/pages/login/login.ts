// pages/login/login.ts
import {formRules} from '@utils/validate'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/user'
import {getToken} from '@utils/token'
const app = getApp()

const rules = {
  username:[
    {
      required: true,
      message: '请输入手机号'
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手机号格式错误'
    }
  ],
  password:[
    {
      required: true,
      message: '请输入密码'
    },]
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },
  // 登录
  submit(){
    formRules(rules,this.data,(status:boolean)=>{
      if(status){
        const {username,password} = this.data
        this.login({username,password})
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      actions: ['login','getUserInfo'], // 将 this.setList 绑定为仓库中的 setList action
    })
    // 判断是否已经登录，登录则直接跳转至机器人页面
    const token = getToken()
    if(token){
      await this.getUserInfo()
      wx.switchTab({
        url:'/pages/robot/robot'
      })
    }
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
    // this.userStoreBindings.destroyStoreBindings()
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