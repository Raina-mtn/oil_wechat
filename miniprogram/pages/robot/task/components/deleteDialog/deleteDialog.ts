// pages/task/components/taskDelete/taskDelete.ts
import {apiDeleteFavoriteTask} from '@http/api/task'
const ui = require('@utils/toast');
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
    show:false,
    id:null,
    type:null,//taskList-任务列表 taskCollect-收藏任务 taskCycle-周期任务
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openDialog(id,type){
      this.setData({
        show:true,
        id,
        type
      })
    },
    closeDialog(){
      this.setData({
        show:false
      })
    },
    submit(){
      const {type,id} = this.data
      if(type==='taskList'){
        const oldTaskList = wx.getStorageSync('taskList')
        oldTaskList.splice(id,1)
        wx.setStorageSync('taskList', oldTaskList)
        ui.showToast('删除任务成功')
      }else if(type==='taskCollect'){
        apiDeleteFavoriteTask({id}).then(()=>{
          ui.showToast('删除任务成功')
        })
      }
      this.triggerEvent("refresh");
      this.closeDialog()
    }
  }
})