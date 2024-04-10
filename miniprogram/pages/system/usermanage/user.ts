// pages/system/usermanage/user.ts
import {apiGetUsersInfo, apiGetRoles, apiGetOrganizations} from '@http/api/usersmanage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableList:[],
    organizationColumns: [],
    roleColumns: [],
    organizationId:"",//所属单位
    organizationName:"",//所属单位
    roleId:"",//所属职务
    roleName:""//所属职务
  },

onClick(e){
  const {username, accountName, organizationName, roleName, userId, organizationId, roleId} = e.currentTarget.dataset.userDetails
  wx.navigateTo({
    url:`/pages/system/usermanage/user-detail/user-detail?username=${username}&accountName=${accountName}&organizationName=${organizationName}&roleName=${roleName}&userId=${userId}&organizationId=${organizationId}&roleId=${roleId}`
  })
},
onClickAdd(){
  wx.navigateTo({
    url:'/pages/system/usermanage/add-user/add-user'
  })
},
// 获取所属单位
async getOrganizationList(){
  try {
    const res = await apiGetOrganizations()
    this.setData({
      organizationColumns:res
    })
  } catch (error) {
    console.log(error)
  }
},
// 获取所属职务
async getRoleList(){
  try {
    const res = await apiGetRoles()
    this.setData({
      roleColumns:res
    })
  } catch (error) {
    console.log(error)
  }
},
// 所属单位
async onConfirmOrganization(e:any){
  const index = e.detail.value
  this.setData({
    organizationId:this.data.organizationColumns[index].organizationId,
    organizationName:this.data.organizationColumns[index].organizationName,
  })
  this.getList()
},
// 所属职务
async onConfirmRole(e:any){
  const index = e.detail.value
  this.setData({
    roleId:this.data.roleColumns[index].roleId,
    roleName:this.data.roleColumns[index].roleName,
  })
  this.getList()
},
async getList(){
  const {organizationId,roleId} = this.data
  const params = {
    organizationId,
    roleId
  }
  try {
    // //获取用户信息
    const res = await apiGetUsersInfo(params)
    this.setData({tableList: res})
  } catch (error) {
    console.log(error)
  }
},
// 清空picker
clearPicker(e){
  this.setData({
    [e.currentTarget.dataset.propvalue]:'',
    [e.currentTarget.dataset.proplable]:'',
  })
  this.getList()
},
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.getList()
    this.getOrganizationList()
    this.getRoleList()
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