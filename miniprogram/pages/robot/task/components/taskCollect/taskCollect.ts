// pages/task/components/taskCollect/taskCollect.ts
import Dialog from '@vant/weapp/dialog/dialog';
import {apiGetFavoriteTasks} from '@http/api/task'
import { store } from '@store/user'
const computedBehavior = require('miniprogram-computed').behavior
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

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchParams:'',
    checkIndex:null,
    currenItem:{},
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
    check(e){
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
    async getList(){
      const taskList = await apiGetFavoriteTasks()
       this.setData({
         taskList: taskList
       })
    },
    refresh(){
      this.setData({checkIndex:null})
      this.getList()
    },
    delete(){
      const {currenItem,checkIndex} = this.data
      if(checkIndex!==null){
        this.selectComponent("#delete-dialog").openDialog(currenItem.id,'taskCollect')
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
      const {currenItem,checkIndex} = this.data
      if(checkIndex!==null){
        this.selectComponent("#execute-dialog").openDialog(currenItem,'taskCollect')
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
        this.selectComponent("#cycle-dialog").openDialog(currenItem,'taskCollect')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要周期执行的任务!',
        })
      }
    },
    cancleCollect(){
      const {checkIndex,currenItem} = this.data
      if(checkIndex!==null){
        this.selectComponent("#collect-dialog").openDialog(currenItem,'taskCollect')
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要取消收藏的任务!',
        })
      }
    },
  },
  ready(){
    this.getList()
  }
})