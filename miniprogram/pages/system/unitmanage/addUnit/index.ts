// pages/task/components/taskDelete/taskDelete.ts
import {apiAddOrganization,apiUpdateOrganization} from '@http/api/unit'

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
    value:"",
    id:"",
    isEdit:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openDialog(detail={}){
      this.setData({
        show:true,
        value:detail?.name,
        id:detail?.realId,
      })
    },
    closeDialog(){
      this.setData({
        show:false,
        id:"",
        value:""
      })
    },
    onChange(){

    },
    async onSubmit(){
      const {value,id} = this.data
      if(!value) return wx.showToast({
        title:'请输入单位名称',
        icon: 'none'
      })
      let params = {
        organizationName:value,
        organizationId:id
      }
      const func = id ? apiUpdateOrganization : apiAddOrganization ;
      try {
        await func(params)
        this.triggerEvent('getList')
        this.closeDialog()
      } catch (error) {
        console.log(error)
      }
    }
  }
})