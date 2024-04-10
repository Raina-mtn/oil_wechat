// pages/task/components/taskDelete/taskDelete.ts
import {apiIssueTask} from '@http/api/task'
import dayjs from 'dayjs';
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

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:false,
    type:'',
    currenItem:null,
    loading:false
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
        show:false,
        loading:false
      })
    },
    async submit(){
      const {type,currenItem} = this.data
      let params = {}
      this.setData({loading:true})
      if(type==='taskList'){
        params = {
          ...currenItem,
          planTime:dayjs().format('YYYY-MM-DD HH:mm:ss') ,
          deviceIds:currenItem.deviceIds.join(),
          taskAllNum:currenItem.deviceIds.length,
        }
      }else if(type==='taskCollect'){
        params = {
          ...currenItem,
          planTime:dayjs().format('YYYY-MM-DD HH:mm:ss') ,
          deviceIds:currenItem.deviceInfos,
          taskAllNum:currenItem.deviceNum,
        }
      }
      try {
        await apiIssueTask(params).then(()=>{
          ui.showToast('下发任务成功')
        })
      } catch (error) {
        if(error){
          ui.showToast()
        }else{
          ui.showToast('下发任务失败')
        }
      }
      this.closeDialog()
    },
  }
})