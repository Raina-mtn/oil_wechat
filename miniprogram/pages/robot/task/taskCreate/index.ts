// pages/robot/task/components/taskCreate/index.ts
import  { apiGetDevices } from '@http/api/task'
import { store } from '@store/user'
import {formRules} from '@utils/validate'
const rules = {
  taskName:[
    {
      required: true,
      message: '请输入设备任务'
    }],
    deviceIds:[
    {
      required: true,
      message: '请选择设备点位'
    },
  ]
  }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName:'',
    deviceIds:[],
    deviceList: []
  },
  pointChange(e:any){
    console.log('e.detail',e.detail)
    this.setData({
      deviceIds:e.detail
    })
  },
  submit(){
    formRules(rules,this.data,(status:boolean)=>{
      if(status){
        const {taskName,deviceIds} = this.data
        const date = new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
        // const params = JSON.stringify({taskName,deviceIds})
        const oldTaskList = wx.getStorageSync('taskList')
        let newTaskList = []
        if (oldTaskList && oldTaskList.length > 0) {
          newTaskList = [
            {
              taskName,
              deviceIds,
              date
            }, ...oldTaskList
          ]
        } else {
          newTaskList = [
            {
              taskName,
              deviceIds,
              date
            }
          ]
        }
        wx.setStorageSync('taskList', newTaskList)
        const workstationId = store.currentRobot?.workstationId
        wx.navigateTo({
          url:`../task?id=${workstationId}`
        })
      }
    })
  },
  onCancel () {
    wx.navigateTo({
      url:`../task`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

    this.onGetDiviceList()
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

  // 获取点位列表
  onGetDiviceList () {
    apiGetDevices().then(res => {
      this.setData({
        deviceList: res
      })
    })
  }
})