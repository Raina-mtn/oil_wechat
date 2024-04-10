// pages/system/devicemanage/device-detail/device-detail.ts
import Dialog from '@vant/weapp/dialog/dialog';
import {apiDeleteDevice} from '@http/api/device'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},//设备详情
    listMap:[
      {key:"deviceId",name:'设备ID号'},
      {key:"workstationId",name:'工作站ID号'},
      {key:"type",name:'设备类型'},
      {key:"phase",name:'设备相别'},
      {key:"oilWeight",name:'油重'},
      {key:"oilDensity",name:'油密度（t/m³）'},
      {key:"navigationPoint",name:'导航点'},
      {key:"log",name:'简介'},
    ]
  },
  delete(){
    Dialog.confirm({
      title: '提示',
      message: '是否删除该信息？',
    })
    .then(async () => {
      const {workstationId,deviceId} = this.data.detail
      try {
        const params = {
          workstationId,
          deviceId
        }
        await apiDeleteDevice(params)
        // 操作上一页方法 获取更新的list
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; 
        prevPage.getList()
        wx.navigateBack()
      } catch (error) {
        console.log(error)
      }
      
    })
  },
  // 跳转编辑
  onEdit(){
    wx.navigateTo({
      url:'/pages/system/devicemanage/add-device/add-device?type=edit&detail='+JSON.stringify(this.data.detail)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options:any) {
    const detail = options.item
    this.setData({
      detail:JSON.parse(detail)
    })
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