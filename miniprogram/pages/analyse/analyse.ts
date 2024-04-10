// import * as `echarts` from '../../components/ec-canvas/echarts';
import {apiFireUp,apiTemControl,apiBridgeControl,apiGetPressure,apiGetTemporary,apiGetOtherState} from '@http/api/analyse'
import {apiGetTaskInfo} from '@http/api/robot'
const computedBehavior = require("miniprogram-computed").behavior;
import { store } from '@store/user'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
const ui = require('@utils/toast');
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  behaviors: [computedBehavior],
  onShareAppMessage: function () {

  },
  data: {
    isGasCollapse:true,
    isTemperatureCollapse:true,
    isStatusCollapse:true,
    temperatureState:0,//0-退温，1-升温	
    bridgeState:0,//0-退桥流，1-加桥流
    pressureList:{},//气体
    temporartList:{},//温控 
    otherList:{},//其他状态 
    timerArr:[],//定时器数组
    taskInfo:{}
  },
  computed:{
    btns({temperatureState,bridgeState}){
      return [
        {
          icon:'icon-btn_ic_fire_highlight',
          label:'氢焰点火',
          method:'fireUp'
        },
        {
          icon:'icon-btn_ic_temp_highlight',
          label:temperatureState?'升温':'退温',
          method:'TemControl'
        },
        {
          icon:'icon-btn_ic_current_highlight',
          label:bridgeState?'加桥流':'退桥流',
          method:'bridgeControl'
        },
        {
          icon:'icon-btn_ic_view_highlight',
          label:'谱图分析',
          method:'goChromatographys'
        },
        {
          icon:'icon-btn_ic_setting_default',
          label:'设置参数',
          method:'goSeting'
        },
        {
          icon:'icon-btn_ic_sampling_highlight',
          label:'采样参数',
          method:'goSample'
        },
        {
          icon:'icon-btn_ic_count_highlight',
          label:'计算参数',
          method:'goCalParameters'
        },
        {
          icon:'icon-btn_ic_count_highlight',
          label:'计算方式',
          method:'goCalculation'
        },
      ];
    }
  },
  //获取气体参数
  async getPressure(){
    const workstationId = store.currentRobot?.workstationId
    if(workstationId){
      const pressureList = await apiGetPressure({workstationId})
      this.setData({pressureList})
    }
  },
  //获取温控信息
  async getTemporary(){
    const workstationId = store.currentRobot?.workstationId
    if(workstationId){
      const temporartList = await apiGetTemporary({workstationId})
      this.setData({temporartList})
    }
  },
  //获取其他状态信息
  async getOtherState(){
    const workstationId = store.currentRobot?.workstationId
    if(workstationId){
      const otherList = await apiGetOtherState({workstationId})
      this.setData({otherList})
    }
  },
  // 气体
  changeGasCollapse(){
    const isGasCollapse = !this.data.isGasCollapse
    this.setData({isGasCollapse})
  },
  // 温控
  changeTemperatureCollapse(){
    const isTemperatureCollapse = !this.data.isTemperatureCollapse
    this.setData({isTemperatureCollapse})
  },
  // 其他状态
  changeStatusCollapse(){
    const isStatusCollapse = !this.data.isStatusCollapse
    this.setData({isStatusCollapse})
  },
  //氢焰点火
  async fireUp(){
    Dialog.confirm({
      title: '提示',
      message: '请确认是否氢焰点火！',
    })
      .then(() => {
        apiFireUp().then(()=>{
          ui.showToast('氢焰点火成功！')
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  //温控（升温、降温）
  async TemControl(){
    const {temperatureState}=this.data
    Dialog.confirm({
      title: '提示',
      message: `请确认是否${temperatureState?'升温':'退温'}!`,
    })
      .then(() => {
        apiTemControl({controlType:temperatureState}).then(()=>{
          ui.showToast(`${temperatureState?'升温':'退温'}成功！`)
          this.setData({
            temperatureState:temperatureState?0:1
          })
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  //桥流控制
  async bridgeControl(){
    const {bridgeState}=this.data
    Dialog.confirm({
      title: '提示',
      message: `请确认是否${bridgeState?'加桥流':'退桥流'}!`,
    })
      .then(() => {
        apiBridgeControl({controlType:bridgeState}).then(()=>{
          ui.showToast(`${bridgeState?'加桥流':'退桥流'}成功！`)
          this.setData({
            bridgeState:bridgeState?0:1
          })
        })
      })
      .catch(() => {
        // on cancel
      });
  },
  // 计算参数
  goCalParameters(){
    wx.navigateTo({
      url:'/pages/analyse/calParameters/index'
    })
  },
  // 计算方式
  goCalculation(){
    this.selectComponent("#calculation-dialog").openDialog()
  },
  // 采样参数
  goSample(){
    wx.navigateTo({
      url:'/pages/analyse/sampleParameters/index'
    })
  },
  // 参数设置
  goSeting(){
    wx.navigateTo({
      url:'/pages/analyse/setParameters/index'
    })
  },
  // 谱图分析
  goChromatographys(){
    wx.navigateTo({
      url:'/pages/analyse/chromatography/index'
    })
  },
  onLoad(){
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot'],
    })
  },
  onShow() {
    // 每次切换到页面默认刷新一次
    this.getPressure()
    this.getTemporary()
    this.getOtherState()
    this.selectComponent("#step").getProcess()

    this.getTabBar().init();
    
    // 进度5s请求一次
    const timer1 = setInterval(()=>{
      this.selectComponent("#step").getProcess()
    },5*1000)

    // 气流温控10s请求一次
    const timer2 = setInterval(()=>{
      this.getPressure()
      this.getTemporary()
      this.getOtherState()
    },10*1000)


    // 日志10s请求一次
    const timer3 = setInterval(()=>{
      this.selectComponent("#log").getList()
    },10*1000)

    //taskInfo 5s请求一次
    const timer4 = setInterval(async()=>{
      console.log('123')
      const taskInfo = await apiGetTaskInfo()
      this.setData({taskInfo})
    },5*1000)

    // 将定时器添加到数组
    this.setData({
      timerArr:[timer1,timer2,timer3,timer4]
    })
  },
  onHide(){
    // 清除定时器
    this.data.timerArr.forEach((timer) => {
      clearInterval(timer);
    });
    // 清空数组
    this.setData({
      timerArr:[]
    })
  }

});
