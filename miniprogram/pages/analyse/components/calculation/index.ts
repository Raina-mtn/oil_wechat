// pages/task/components/taskDelete/taskDelete.ts\
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import {apiGetCalculationMethod,apiSetCalculationMethod} from '@http/api/analyse'
import { store } from '@store/user'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
  },
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
    radio:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async openDialog(){
      this.setData({
        show:true
      })
      const {calMethod} = await apiGetCalculationMethod()
      this.setData({
        radio:calMethod.toString()
      })
    },
    closeDialog(){
      this.setData({
        show:false
      })
    },
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
    // 提交
    async onSubmit(){
      const {radio} = this.data
      const params = {
        calMethod:radio === 'true'
      }
      try {
        await apiSetCalculationMethod(params)
      } catch (error) {
        console.log(error)
      }
      
    }
  }
})