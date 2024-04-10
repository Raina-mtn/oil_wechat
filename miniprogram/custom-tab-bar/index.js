import { store } from '@store/tabbar'
import {getUser} from '@utils/token'
import { createStoreBindings } from "mobx-miniprogram-bindings";
const computedBehavior = require("miniprogram-computed").behavior;

Component({
  // behaviors: [computedBehavior],
	// data: {
  //   active: 0,
  //   list: [],
	// },
  // computed:{
  //   roleId(){
  //     return getUser().roleId
  //   }
  // },
  // observers: {
  //   'roleId': function(newVal) {
  //     console.log('newVal',newVal)
  //     this.getList()
  //   }
  // },
  lifetimes: {
    attached: function() {
      
    this.storeBindings = createStoreBindings(this, {
      store:store, // 需要绑定的数据仓库
      fields: {active:'active',list:'list'},
      actions: ['getList','onChange'],
    })
    this.storeBindings.updateStoreBindings()
    this.getList()
    },
  },
	methods: {
    // // 根据当前角色获取菜单
    // getList(){
    //   // 在组件实例进入页面节点树时执行
    //   const {roleId} = store.userInfo
    //   let list
    //   // roleId为1就显示配置页面，不然不显示
    //   if(roleId === 1){
    //     list = [{
    //       url: "/pages/robot/robot",
    //       text: "机器人",
    //       normal: "../assets/images/robot.png",
    //       active: "../assets/images/robot_selected.png"
    //     }, {
    //       url: "/pages/analyse/analyse",
    //       text: "色谱分析",
    //       normal: "../assets/images/analyse.png",
    //       active: "../assets/images/analyse_selected.png"
    //     }, {
    //       url: "/pages/system/system",
    //       text: "系统配置",
    //       normal: "../assets/images/system.png",
    //       active: "../assets/images/system_selected.png"
    //     }, {
    //       url: "/pages/user/user",
    //       text: "我的",
    //       normal: "../assets/images/user.png",
    //       active: "../assets/images/user_selected.png"
    //     }]
    //   }else{
    //     list = [{
    //       url: "/pages/robot/robot",
    //       text: "机器人",
    //       normal: "../assets/images/robot.png",
    //       active: "../assets/images/robot_selected.png"
    //     }, {
    //       url: "/pages/analyse/analyse",
    //       text: "色谱分析",
    //       normal: "../assets/images/analyse.png",
    //       active: "../assets/images/analyse_selected.png"
    //     },{
    //       url: "/pages/user/user",
    //       text: "我的",
    //       normal: "../assets/images/user.png",
    //       active: "../assets/images/user_selected.png"
    //     }]
    //   }
    //   this.setData({
    //     list
    //   })
    // },
		// onChange(event) {
		// 	wx.switchTab({
		// 		url: this.data.list[event.detail].url
		// 	});
		// 	this.setData({ active: event.detail });
		// },
 
		init() {
      const page = getCurrentPages().pop();
			this.setData({
				active: store.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});