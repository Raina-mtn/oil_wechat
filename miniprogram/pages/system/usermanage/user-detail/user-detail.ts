// pages/system/usermanage/user-detail/user-detail.ts
import Dialog from '../../../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import {apiDeleteUser, apiGetOrganizations, apiUpdateUser, apiGetRoles, apiResetPassword} from '@http/api/usersmanage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo:{},
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    idEdit:false,
    form: {          // 用于其他功能提交的参数
        userId: 1,
        username:'',
        accountName: '',
        organizationName:'',
        roleName:'',
        organizationId: 1,
        roleId: 1,
        password: '',
    },
    showUnit:false,
    showPost:false,
  },
  onChange(event:any) {
    const { picker, value, index } = event.detail;
    console.log(value);
  },
  onCancel(){
    this.setData({ show: false });
  },
  onClick(){
    this.setData({ show: true });
  },
  confirmUserName(e){
    this.setData({
        ['form.username'] : e.detail.value,
    })
  },
  confirmAccountName(e){
    this.setData({
        ['form.accountName'] : e.detail.value,
    })
  },
  async onClickUnit(){
    this.setData({
        showUnit:!this.data.showUnit
      })
    //   获取所属单位信息
        const organizationsInfo = await apiGetOrganizations()
        this.setData({columns: organizationsInfo})
  },
  onConfirmUnit(event:any){
    this.setData({
        ['form.organizationId'] : event.detail.value.organizationId,
        ['form.organizationName'] : event.detail.value.organizationName,
      showUnit:!this.data.showUnit
    })
 },
 async onClickPost(){
    this.setData({
        showPost:!this.data.showPost
      })
    //   获取职务信息
      const postInfo = await apiGetRoles()
      this.setData({columns: postInfo})
  },
  onConfirmPost(event:any){
    this.setData({
      ['form.roleId']:event.detail.value.roleId,
      ['form.roleName']:event.detail.value.roleName,
      showPost:!this.data.showPost
    })
},
//   修改用户信息
onClickConfirmEdit(){
    Dialog.confirm({
        selector:'#van-dialog',
        title: '提示',
        message: '确认更改当前账号信息？',
      })
        .then(async () => {
          const {userId, accountName, organizationId, roleId, password} = this.data.form     
          await apiUpdateUser({userId, accountName, organizationId, roleId, password})
          wx.navigateBack({
            url:'/pages/system/usermanage/user',
            success() {
              let page = getCurrentPages().pop(); //跳转页面成功之后
              if (!page) return;
              page.onLoad(); //如果页面存在，则重新刷新页面
            }
          }) 
        })
        .catch(() => {
        //   on cancel
        });
},
  onClickEdit(){
    this.setData({ idEdit: true });
    this.setData({
        ['form.organizationId']:this.data.detailInfo.organizationId,
        ['form.userId']:this.data.detailInfo.userId,
        ['form.accountName']:this.data.detailInfo.accountName,
        ['form.roleId']:this.data.detailInfo.roleId,
        ['form.username']:this.data.detailInfo.username,
        ['form.organizationName']:this.data.detailInfo.organizationName,
        ['form.roleName']:this.data.detailInfo.roleName,
    })
  },
//   删除用户
onClickDelete(){
    Dialog.confirm({
        selector:'#van-dialog',
        title: '提示',
        message: '是否删除当前账号？',
      })
        .then(async () => {
          await apiDeleteUser({userId:this.data.detailInfo.userId})
          wx.navigateBack({
            url:'/pages/system/usermanage/user',
            success() {
              let page = getCurrentPages().pop(); //跳转页面成功之后
              if (!page) return;
              page.onLoad(); //如果页面存在，则重新刷新页面
            }
          })
        })
        .catch(() => {
        //   on cancel
        });
},
// 重置密码
async onClickResetPassword(){
    Dialog.confirm({
        selector:'#van-dialog',
        title: '提示',
        message: '确认重置当前账号密码？',
      })
        .then(async () => {
          const {userId} = this.data.form
          await apiResetPassword({userId})
          wx.navigateBack({
            url:'/pages/system/usermanage/user',
            success() {
              let page = getCurrentPages().pop(); //跳转页面成功之后
              if (!page) return;
              page.onLoad(); //如果页面存在，则重新刷新页面
            }
          })
        })
        .catch(() => {
        //   on cancel
        });
},
  resetCancel(){
    this.setData({ idEdit: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    this.setData({detailInfo: option})
    
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