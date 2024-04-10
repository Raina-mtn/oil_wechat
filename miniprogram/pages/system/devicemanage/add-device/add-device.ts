// pages/system/devicemanage/add-device/add-device.ts
import {formRules} from '../../../../utils/validate'
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { store } from '@store/user'
import {apiAddDevice,apiEditDevice} from '@http/api/device'
const computedBehavior = require('miniprogram-computed').behavior

const rules = {
  deviceName:[
    {
      required: true,
      message: '请选择设备名称'
    }
  ],
  deviceId:[
    {
      required: true,
      message: '请输入设备ID号'
    },
  ],
  workstationId:[
    {
      required: true,
      message: '请输入工作站ID号'
    },
  ],
  type:[
    {
      required: true,
      message: '请选择设备类型'
    },
  ],
  phase:[
    {
      required: true,
      message: '请选择设备相别'
    },
  ],
  oilWeight:[
    {
      required: true,
      message: '请输入油重'
    },
  ],
  oilDensity:[
    {
      required: true,
      message: '请输入油密度（t/m³）'
    },
  ],
  navigationPoint:[
    {
      required: true,
      message: '请选择导航点'
    },
  ],
  log:[
    {
      required: true,
      message: '请选择简介'
    },
  ],
}
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    formData:{},
    isAdd:true,//是否新增还是编辑
  },
  computed:{
    form(data){
      return [
        {
          label:'设备名称',
          prop:'deviceName',
          el:'input'
        },
        {
          label:'设备ID号',
          prop:'deviceId',
          el:'input'
        },
        {
          label:'工作站ID号',
          prop:'workstationId',
          el:'input'
        },
        {
          label:'设备类型',
          prop:'type',
          el:'input'
        },
        {
          label:'设备相别',
          prop:'phase',
          el:'input'
        },
        {
          label:'油重',
          prop:'oilWeight',
          el:'input'
        },
        {
          label:'油密度（t/m³）',
          prop:'oilDensity',
          el:'input'
        },
        {
          label:'导航点',
          prop:'navigationPoint',
          el:'input'
        },
        {
          label:'简介',
          prop:'log',
          el:'input'
        },
      ]
    }
  },
  // input方法-输入
  inputChange(e){
    const currentProp = e.currentTarget.dataset.prop
    this.setData({[`formData.${currentProp}`]: e.detail});
  },
  // 取消
  cancel(){
    wx.navigateBack()
  },
  // 确认
  submit(){
    const {formData,isAdd} = this.data
    formRules(rules,formData,async (status:boolean)=>{
      if(!status) return 
      try {
        // 区分新增还是编辑接口
        const func = isAdd ? apiAddDevice : apiEditDevice
        await func(formData)
         // 操作上一页方法 获取更新的list
        const pages = getCurrentPages();
        //  编辑和新增页面的上一页不同 需要区分参数 上一页是-2 以此类推
         const pageNum = isAdd ? 2 :3;
         const prevPage = pages[pages.length - pageNum]; 
         prevPage.getList()
        // 编辑和新增页面的上一页不同 返回上一页默认1 以此类推
         wx.navigateBack({
          delta: isAdd ? 1 : 2
         })
      } catch (error) {
        console.log(error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { type,detail} = options
    wx.setNavigationBarTitle({
      title:(type==='add'?'新增':'编辑')+'设备'
   })
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot'], // 将 this.data.list 绑定为仓库中的 list ，即天气数据
    })
    this.storeBindings.updateStoreBindings()
    this.setData({
      'formData.workstationId':this.data.currentRobot.workstationId,
      isAdd:type === 'add'
    })
    if(options.type === 'add') return 
    this.setData({
      formData:JSON.parse(detail)
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

  }
})