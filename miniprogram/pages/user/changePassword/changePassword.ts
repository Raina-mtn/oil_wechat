// pages/user/changePassword/changePassword.ts
import {apiUpdateUserPassword} from '@http/api/usersmanage'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:3,
    timer:0,
    isShowEdit:true,
    isShow:true,
    isShowNew:true,
    isShowError:false,
    errorInfo:"",
    newPassword:"",
    repeatPassword:"",
    oldPassword:""
  },
  // 新密码是否为可见
  showPassword(){
    this.setData({
      isShow:!this.data.isShow
    })
  },
  // 确认密码是否为可见
  showPasswordNew(){
    this.setData({
      isShowNew:!this.data.isShowNew
    })
  },
  onCancel(){
    wx.navigateBack()
  },
  // 确认按钮提交校验
  async onSubmitForm(){
    // if (this.data.oldPassword !== "1") {
    //   this.setData({
    //     isShowError:!this.data.isShowError,
    //     errorInfo:"旧密码错误！"
    //   })
    //   return ;
    // }
    if (this.data.newPassword!==this.data.repeatPassword) {
      this.setData({
        isShowError:!this.data.isShowError,
        errorInfo:"您两次输入的密码不一致！"
      })
      return ;
    }
    const {newPassword,oldPassword} = this.data
    const params = {
      oldPassword,
      newPassword
    }
    await apiUpdateUserPassword(params)
    this.setData({
      isShowEdit:!this.data.isShowEdit,
    })
    this.waitLogout();
  },
  // 修改成功后3秒自动登出
  waitLogout(){
    let that = this;
    let time = that.data.time;    
    that.setData({
      timer:setInterval(function(){
        time--;
        that.setData({
          time:time
        })
        if (time == 0) {
          clearInterval(that.data.timer)
          setTimeout(()=>{
            // wx.redirectTo({url:'/pages/login/login'})
            this.logout()
          },80)
        }
      },1000)
    })
  },
// 点击确认时调用的函数
confirmLogout() {
  // 清除定时器
  clearInterval(this.data.timer);
  // 立即退出
  this.logout()
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      actions:['logout']
    })
  	this.storeBindings.updateStoreBindings()
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