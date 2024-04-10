// pages/robot/history/indx.ts
import {apiGetHistoryTaskList} from '@http/api/task'
import Dialog from '@vant/weapp/dialog/dialog';
const ui = require('@utils/toast');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns:[
      {
        label:'实时任务',
        value:'1'
      },
      {
        label:'周期任务',
        value:'2'
      },
    ],
    startTime:"",
    endTime:"",
    taskType:"",
    taskName:"",
    pageSize:10,
    pageNum:1,
    isEnd:false,//是否全部分页加载完成
    list:[]
  },
  
    // 选择日期
    bindDateChange(e){
      this.setData({
        [e.currentTarget.dataset.type]: e.detail.value
      })
      const {startTime,endTime} = this.data
      if(startTime&&endTime){
        this.resetListParams()
        this.getList()
      }
    },
    // 清空日期
    clearDate(e){
      this.setData({
        [e.currentTarget.dataset.type]:''
      })
    },
    // 清空picker
    clearPicker(e){
      this.setData({
        [e.currentTarget.dataset.propvalue]:'',
        [e.currentTarget.dataset.proplable]:'',
      })
      this.resetListParams()
      this.getList()
    },
  // 任务类型
  bindPickerChange(e){
    const index = e.detail.value
    this.setData({
      taskType:this.data.columns[index].value,
      taskName:this.data.columns[index].label,
    })
    this.resetListParams()
    this.getList()
  },
  // 获取列表
  async getList(){
    const {taskType,pageSize,pageNum,startTime,endTime,isEnd,list} = this.data
    if(startTime && endTime && startTime>endTime){
      ui.showToast('结束时间需大于等于开始时间！')
      return
    }
    if(isEnd) return
    wx.showLoading({
      title: '加载中',
    })
    const params = {
      taskType,
      pageSize,
      pageNum,
      startTime,
      endTime
    }
    try {
      const {records=[],pages} = await apiGetHistoryTaskList(params)
      if(pages<=pageNum){
        this.setData({
          isEnd:true
        })
      }
      this.setData({
        pageNum:pageNum+1,
        list:[...list,...records]
      })
    } catch (error) {
      console.log(error)
    }finally{
      wx.hideLoading()
    }
  },
  // 重置list参数
  resetListParams(){
    this.setData({
      pageNum:1,
      isEnd:false,
      list:[]
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})