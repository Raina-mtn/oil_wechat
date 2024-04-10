// components/robotSelect/robotSelect.ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '@store/user'
import {robotStateObj} from '@enum/config'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:null,
    robotStateObj,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancle(){
      this.setData({
        show: false,
        current:store.currentRobot
      })
    },
    submit(){
      this.setCurrentRobot(this.data.current)
      this.cancle()
    },
    check(e){
      this.setData({
        current: e.currentTarget.dataset.item
      })
    }
  },
  ready:function() {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: ['currentRobot','robotList'],
      actions: ['setCurrentRobot'], // 将 this.setList 绑定为仓库中的 setList action
    })
    this.setData({
      current:store.currentRobot
    })
  }
})