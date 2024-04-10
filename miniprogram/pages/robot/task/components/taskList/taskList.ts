// pages/task/components/taskList/taskList.ts
import Dialog from '@vant/weapp/dialog/dialog';
import { store } from '@store/user'
const computedBehavior = require('miniprogram-computed').behavior
const ui = require('@utils/toast');
Component({
  behaviors: [computedBehavior],
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // taskList:{
    //   type: Array
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchParams:'',//查询
    checkIndex:null,//当前选中
    currenItem:null,
    taskList:[]
  },
  computed:{
    searchList({searchParams,taskList}){
      return searchParams?taskList.filter(i=>i.taskName.includes(searchParams)):taskList
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    check(e: any){
      if(this.data.checkIndex === e.currentTarget.dataset.index){
        this.setData({
          checkIndex:null,
          currenItem:{}
        })
      }else{
        this.setData({
          checkIndex:e.currentTarget.dataset.index,
          currenItem:e.currentTarget.dataset.item
        })
      }
    },
    getList(){
      const taskList = wx.getStorageSync('taskList')
       this.setData({
         taskList: taskList
       })
    },
    refresh(){
      this.getList()
       this.setData({
        checkIndex: null
       })
    },
    delete(){
      const {checkIndex} = this.data
      if(checkIndex!==null){
        this.selectComponent("#delete-dialog").openDialog(checkIndex,'taskList')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要删除的任务!',
        })
      }
    },
    execute(){
      const {checkIndex,currenItem} = this.data
      if(checkIndex!==null){
        this.selectComponent("#execute-dialog").openDialog(currenItem,'taskList')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要立即执行的任务!',
        })
      }
    },
    cycle(){
      const {checkIndex,currenItem} = this.data
      if(checkIndex!==null){
        this.selectComponent("#cycle-dialog").openDialog(currenItem,'taskList')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要周期执行的任务!',
        })
      }
    },
    collect(){
      const {checkIndex,currenItem} = this.data
      if(checkIndex!==null){
        this.selectComponent("#collect-dialog").openDialog(currenItem,'taskList')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要收藏的任务!',
        })
      }
    },
    // 新增任务
    create(){
      const workstationId = store.currentRobot?.workstationId
      if(workstationId){
        wx.navigateTo({
          url: '/pages/robot/task/taskCreate/index?id=' + workstationId
        })
      }else{
        ui.showToast('请选择机器人！')
      }
    }
  },
  ready(){
    this.getList()
  }
})