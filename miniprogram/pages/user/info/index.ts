// pages/user/info/index.ts
const computedBehavior = require("miniprogram-computed").behavior;

Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    fileList:[]
  },
  computed:{
    userInfoList(){
      return [
        {
          label:'用户账号',
          icon:'',
          data:'ZJQZ124'
        },
        {
          label:'用户姓名',
          icon:'',
          data:'张三'
        },
        {
          label:'所属单位',
          icon:'',
          data:'XXX变电站'
        },
        {
          label:'职务',
          icon:'',
          data:'超级管理员'
        },
      ]
    }
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log('file',file)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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