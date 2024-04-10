// pages/task/components/taskCollect/taskCollect.ts
import Dialog from '@vant/weapp/dialog/dialog';
import { store } from '@store/user'
import {apiGetCycleTask,apiDeleteCycleTask} from '@http/api/task'
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
      return searchParams?taskList.filter(i=>i.cycleTaskName.includes(searchParams)):taskList
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
      const taskList = await apiGetCycleTask()
       this.setData({
         taskList: taskList
       })
    },
    refresh(){
      this.setData({checkIndex:null})
      this.getList()
    },
    cancleCycle(){
      const {checkIndex,currenItem} = this.data
      if(checkIndex!==null){
        Dialog.confirm({
          context: this,
          title: '提示',
          message: '是否取消周期执行该任务!',
        })
        .then(() => {
          apiDeleteCycleTask({cycleTaskId:currenItem.cycleTaskId}).then(()=>{
            ui.showToast('取消周期任务成功')
            this.refresh()
          })
        })
      }
      else{
        Dialog.alert({
          context: this,
          title: '提示',
          message: '请选择需要取消周期执行的任务!',
        })
      }
    },
  },
  ready(){
    this.getList()
  }
})