// pages/system/devicemanage/device.ts
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'
import {apiGetDeviceTypes,apiGetDeviceList} from '@http/api/common'
import {apiGetRobotList} from '@http/api/robot'

Page({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    tableList:[],
    columns: [],//所属单位
    columnsDevice:[],//设备类型list
    showUnit:false,
    unitValue:"",//所属工作站
    unitName:"",//所属工作站
    deviceValue:"",//设备类型
  },
onJumpDetail(event:any){
  let item = event.currentTarget.dataset.item
  wx.navigateTo({
    url:'/pages/system/devicemanage/device-detail/device-detail?item=' + JSON.stringify(item),
  })
},

onClickAdd(){
  wx.navigateTo({
    url:'/pages/system/devicemanage/add-device/add-device?type=add'
  })
},
onConfirmUnit(e){
  const index = e.detail.value
  this.setData({
    unitValue:this.data.columns[index].robotId,
    unitName:this.data.columns[index].robotName,
  })
  this.getList()
  
},
onConfirmDevice(e){
  const index = e.detail.value
  this.setData({
    deviceValue:this.data.columnsDevice[index],
  })
  this.getList()
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
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot'], // 将 this.data.list 绑定为仓库中的 list ，即天气数据
    })
  	this.storeBindings.updateStoreBindings()
    this.getWorkStationList()
    this.getDeviceTypes()
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
  // 获取机器人
  async getWorkStationList(){
    try {
      const res = await apiGetRobotList()
      this.setData({
        columns:res
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 获取设备类型
  async getDeviceTypes(){
    try {
      const res = await apiGetDeviceTypes()
      this.setData({
        columnsDevice:res
      })
    } catch (error) {
      console.log(error)
    }
  },
  // 获取设备列表
  async getList(){
    const {currentRobot:{workstationId},deviceValue,unitValue} = this.data
    const params = {
      workstationId:unitValue || workstationId,
      type:deviceValue
    }
    try {
      const res = await apiGetDeviceList(params)
      this.setData({
        tableList:res
      })
    } catch (error) {
      console.log(error)
    }
    
  }

})