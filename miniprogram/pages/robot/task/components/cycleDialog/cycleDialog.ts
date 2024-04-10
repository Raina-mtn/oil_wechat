// pages/task/components/cycleDialog/cycleDialog.ts
import {store} from '@store/user'
import {formRules} from '@utils/validate'
import {apiIssueCycleTask} from '@http/api/task'
import dayjs from 'dayjs';
const ui = require('@utils/toast');
const rules = {
  startTime	:[
    {
      required: true,
      message: '请选择执行时间'
    },
  ],
  intervalDays:[
    {
      required: true,
      message: '任务间隔时间天数至少为0！'
    },
  ],
  intervalHours	:[
    {
      required: true,
      message: '任务间隔时间小时数至少为0！'
    },
  ],
  intervalMinutes	:[
    {
      required: true,
      message: '任务间隔时间天数至少为0！'
    },
  ],
}
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
    calendarShow:false,
    currenItem:null,
    type:null,//taskList-任务列表 taskCollect-收藏任务 
    formData:{
      intervalDays:0,
      intervalHours:0,
      intervalMinutes:0,
    },
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
        formData:{
          intervalDays:0,
          intervalHours:0,
          intervalMinutes:0,
        }
      })
    },
    showCalendar(){
      this.setData({
        calendarShow:true
      })
    },
    calendarClose(){
      this.setData({
        calendarShow:false
      })
    },
    calendarConfirm(e){
      this.setData({
        ['formData.startTime']:dayjs(e.detail[0]).format('YYYY-MM-DD HH:mm:ss'),
        ['formData.endTime']:dayjs(e.detail[1]).format('YYYY-MM-DD HH:mm:ss')
      })
      this.calendarClose()
    },
    fieldChange(e){
      this.setData({
        [`formData.${e.currentTarget.dataset.key}`]:e.detail
      })
    },
    submit(){
      const {type,currenItem,formData} = this.data
      
      formRules(rules,this.data.formData,(status:boolean)=>{
        const {intervalDays,intervalHours,intervalMinutes}=this.data.formData
        if(!intervalDays&&!intervalHours&&intervalMinutes<30){
          status = false
          ui.showToast('任务间隔时间过短！')
        }
        if(status){
          let params = {}
          this.setData({loading:true})
          if(type==='taskList'){
            params = {
              ...currenItem,
              ...formData,
              cycleTaskName:currenItem.taskName,
              deviceIds:currenItem.deviceIds.join(),
              taskAllNum:currenItem.deviceIds.length,
            }
          }else if(type==='taskCollect'){
            params = {
              ...currenItem,
              ...formData,
              cycleTaskName:currenItem.taskName,
              deviceIds:currenItem.deviceInfos,
              taskAllNum:currenItem.deviceNum,
            }
          }
          try {
            apiIssueCycleTask(params).then(()=>{
              ui.showToast('下发周期任务成功')
            })
          } catch (error) {
            ui.showToast('下发周期任务失败')
          }
          this.closeDialog()
        }
      })
    }
  }
})