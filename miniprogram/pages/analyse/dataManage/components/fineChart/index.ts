// pages/analyse/dataManage/components/historyRecord/historyRecord.ts
import Dialog from '@vant/weapp/dialog/dialog';
const ui = require('@utils/toast');
import {apiGetSampleChromatogramDatabase} from '@http/api/analyse'
import {apiGetDeviceList} from '@http/api/common'
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    checkIndex:null,
    deviceColumns:[],//选择设备数据
    deviceId:"",//选择设备的id
    deviceName:"",//选择设备的name
    pageSize:10,
    pageNum:1,
    startTime:"",
    endTime:"",
    isEnd:false,//是否全部分页加载完成
    list:[],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    check(e){
      if(this.data.checkIndex === e.currentTarget.dataset.index){
        this.setData({
          checkIndex:null
        })
      }else{
        this.setData({
          checkIndex:e.currentTarget.dataset.index
        })
      }
    },
    async showChart(){
      const currenCheckIndex = this.data.checkIndex
      if(currenCheckIndex!==null){
        // 给上一页设置参数
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; 
        await prevPage.getChromatogramData({
          fileName:this.data.list[currenCheckIndex].sa1
        })
        wx.navigateBack()
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要显示的谱图!',
        })
      }
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
      this.resetListParams()
      this.getList()
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
    // 选择设备picker 选择
    bindPickerChange(e){
      const index = e.detail.value
      this.setData({
        deviceId:this.data.deviceColumns[index].deviceId,
        deviceName:this.data.deviceColumns[index].deviceName,
      })
      this.resetListParams()
      this.getList()
    },
    // 获取列表
    async getList(){
      const {deviceId,pageSize,pageNum,startTime,endTime,isEnd,list} = this.data
      if(startTime && endTime && startTime>endTime){
        ui.showToast('结束时间需大于等于开始时间！')
        return
      }
      if(isEnd) return
      wx.showLoading({
        title: '加载中',
      })
      const params = {
        deviceId,
        pageSize,
        pageNum,
        startTime,
        endTime
      }
      try {
        const {records,pages} = await apiGetSampleChromatogramDatabase(params)
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
  },
  lifetimes:{
    async ready(){
      const res = await apiGetDeviceList()
      this.setData({
        deviceColumns:res
      })
      this.getList()
    }
  },
})