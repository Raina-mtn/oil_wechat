// pages/user/editUser/editUser.ts
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'
import {apiGetRoles, apiUpdateUser} from '@http/api/usersmanage'
import {apiGetOrgTree} from '@http/api/unit'
import {formRules} from '@utils/validate'
import {getUser} from '@utils/token'
const computedBehavior = require("miniprogram-computed").behavior;

const rules = {
  username:[
    {
      required: true,
      message: '请输入用户账号'
    }
  ],
  accountName:[
    {
      required: true,
      message: '请输入用户姓名'
    }
  ],
}

Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    columns: [],//所属单位
    roleColumn:[],//职务
    show:false,
    showRole:false,
    username:"",//用户账号
    accountName:"",//用户姓名
    unitDefaultIndex:"",//单位默认选中
    unitSelectItem:{},//单位选中的picker-item
    roleDefaultIndex:"",//职务默认选中
    roleSelectItem:{},//职务选中的picker-item
  },
  computed:{
    userInfo(){
      return getUser()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await Promise.all([this.getOrgList(),this.getRoles()])

    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      actions:['getRobotList']
    })
    this.storeBindings.updateStoreBindings()

    this.initData()

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

  },
  onBack(){
    wx.navigateBack()
  },
  onSubmitForm(){
    const {unitSelectItem,roleSelectItem,accountName,userInfo} = this.data
    formRules(rules,this.data,async (status:boolean)=>{
      if(!status) return
      if(!unitSelectItem.realId) return wx.showToast({icon:'none',title:'请选择所属单位'});
      if(!roleSelectItem.roleId) return wx.showToast({icon:'none',title:'请选择职务'})
      const params = {
        userId:userInfo.userId,
        accountName,
        organizationId:unitSelectItem.realId,
        roleId:roleSelectItem.roleId
      }
      try {
        await apiUpdateUser(params)
        await this.getRobotList()
        // 操作上一页方法 获取更新的list
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; 
        prevPage.reloadUserInfo()
        wx.navigateBack()
      } catch (error) {
        console.log(error)
      }
    })
  },
  // 获取职务
  async getRoles(){
    const res = await apiGetRoles()
    this.setData({
      roleColumn:res
    })
  },
  // 获取单位list
  async getOrgList(){
    try {
      const res = await apiGetOrgTree()
      this.setData({
        columns:res,
      })
    } catch (error) {
      console.log(error)
    }
  },
  onCancel(){
    this.setData({ show: false });
  },
  onClick(){
    this.setData({ show: true });
  },
  onCancelRole(){
    this.setData({ showRole: false });
  },
  onClickRole(){
    this.setData({ showRole: true });
  },
  onConfirm(event){
    this.setData({
      unitSelectItem:event.detail.value
    })
    this.onCancel()
  },
  onConfirmRole(event){
    this.setData({
      roleSelectItem:event.detail.value
    })
    this.onCancelRole()
  },
  bindKeyInput(event){
    const {detail:{value},target:{dataset:{type}}} = event
    this.setData({
      [type]:value
    })
  },
  // 数据回填
  initData(){
    const {username,accountName,roleId,organizationId} = this.data.userInfo
    const {roleColumn,columns} = this.data

    // 处理默认所属单位和职务
    const unitItemIndex = columns.findIndex(item=>item.realId === organizationId)
    const unitItem = columns.find(item=>item.realId === organizationId)
    const roleItemIndex = roleColumn.findIndex(item=>item.roleId == roleId)
    const roleItem = roleColumn.find(item=>item.roleId == roleId)

    this.setData({
      username,
      accountName,
      unitDefaultIndex:unitItemIndex,
      unitSelectItem:unitItem,
      roleSelectItem:roleItem,
      roleDefaultIndex:roleItemIndex
    })
  }
})
