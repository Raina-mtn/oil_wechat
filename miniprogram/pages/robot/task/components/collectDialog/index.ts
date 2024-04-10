// pages/task/components/taskDelete/taskDelete.ts
import {apiAddFavoriteTask,apiDeleteFavoriteTask} from '@http/api/task'
import {store} from '@store/user'
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
    isCancel:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    currenItem:null,
    type:null,//taskList-任务列表 taskCollect-收藏任务 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openDialog(currenItem,type){
      this.setData({
        show:true,
        currenItem,
        type
      })
    },
    closeDialog(){
      this.setData({
        show:false
      })
    },
    submit(){
      const {type,currenItem} = this.data
      let params = {}
      if(type==='taskList'){
        params = {
          ...currenItem,
          deviceInfos:currenItem.deviceIds.join(),
          taskAllNum:currenItem.deviceIds.length,
        }
        try {
          apiAddFavoriteTask(params).then(()=>{
            ui.showToast('收藏任务成功')
          })
        } catch (error) {
          ui.showToast('收藏任务失败')
        }
      }else if(type==='taskCollect'){
        params = {
          id:currenItem.id
        }
        try {
          apiDeleteFavoriteTask(params).then(()=>{
            this.triggerEvent("refresh");
            ui.showToast('取消收藏任务成功')
          })
        } catch (error) {
          ui.showToast('取消收藏任务失败')
        }
      }
      this.closeDialog()
    }
  }
})