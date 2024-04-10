// pages/system/unitmanage/unit.ts
import {apiGetOrgTree} from '@http/api/unit'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    current:null,//当前展开
    currentCheckItem:null,//当前选中-item
    currentType:null,//当前选中-类型-unit/station
  },
  // 新增单位
  addUnit(){
    this.selectComponent("#add-unit").openDialog()
  },
  // 新增变电站
  addSubstation(e){
    wx.navigateTo({
      url:`/pages/system/unitmanage/addStation/index`
    })
  },
  // 选中单位或变电站 - 编辑
  onEdit(){
    const {currentType,currentCheckItem} = this.data
    if(currentType==='station'){
      wx.navigateTo({
        url:`/pages/system/unitmanage/addStation/index?detail=${JSON.stringify(currentCheckItem)}`
      })
    }else{
      this.selectComponent("#add-unit").openDialog(currentCheckItem)
    }
  },
  // 当前展开
  setCurrent(e){
    const index = e.currentTarget.dataset.index
    const current = this.data.current
    if(current===index){
      this.setData({
        current:null
      })
    }else{
      this.setData({
        current:index
      })
    }
  },
  // 设置当前选中
  setCheck(e){
    const item = e.currentTarget.dataset.item
    const type = e.currentTarget.dataset.type
    this.setData({
      currentType:type,
      currentCheckItem:item
    })
  },
  // 编辑
  editUnit(){
    // 判断选中的类型
    const {currentCheckItem,currentType} = this.data
    
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
  // 获取单位和变电站信息
  async getList(){
    try {
      const res = await apiGetOrgTree()
      this.setData({
        listData:res,
        currentCheckItem:null
      })
    } catch (error) {
      console.log(error)
    }
  }
})