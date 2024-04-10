// pages/analyse/components/log/log.ts
import {apiGetLog} from '@http/api/analyse'
import { store } from '@store/user'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
Component({
  //配置显示iconfont 
  options: {
    addGlobalClass: true
  },
  observers: {
    'currentRobot': async function(currentRobot) {
      if(currentRobot){
      }
    }
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
    logList:[],
    logShowList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openLog(){
      this.setData({
        show:true
      })
    },
    onClose(){
      this.setData({
        show:false
      })
    },
    async getList(){
      const workstationId = store.currentRobot?.workstationId
      if(workstationId){
        const logList = await apiGetLog({workstationId})
        this.setData({logList,logShowList:logList?logList.slice(0,2):[]})
      }
    }
  },
  ready(){
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot'],
    })

    this.getList()
  }
})