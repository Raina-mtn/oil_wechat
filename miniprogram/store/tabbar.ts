import { observable, action } from 'mobx-miniprogram'
import { store as userStore } from '@store/user'

// 数据仓库-tabbar
export const store =observable({
  active:0,//当前选中
  list:[],//tabbar列表

  // 根据当前角色获取菜单
  getList: action(async function (data) {
      // 在组件实例进入页面节点树时执行
      const {roleId} = userStore.userInfo
      let list
      // roleId为1就显示配置页面，不然不显示
      if(roleId === 1){
        list = [{
          url: "/pages/robot/robot",
          text: "机器人",
          normal: "../assets/images/robot.png",
          active: "../assets/images/robot_selected.png"
        }, {
          url: "/pages/analyse/analyse",
          text: "色谱分析",
          normal: "../assets/images/analyse.png",
          active: "../assets/images/analyse_selected.png"
        }, {
          url: "/pages/system/system",
          text: "系统配置",
          normal: "../assets/images/system.png",
          active: "../assets/images/system_selected.png"
        }, {
          url: "/pages/user/user",
          text: "我的",
          normal: "../assets/images/user.png",
          active: "../assets/images/user_selected.png"
        }]
      }else{
        list = [{
          url: "/pages/robot/robot",
          text: "机器人",
          normal: "../assets/images/robot.png",
          active: "../assets/images/robot_selected.png"
        }, {
          url: "/pages/analyse/analyse",
          text: "色谱分析",
          normal: "../assets/images/analyse.png",
          active: "../assets/images/analyse_selected.png"
        },{
          url: "/pages/user/user",
          text: "我的",
          normal: "../assets/images/user.png",
          active: "../assets/images/user_selected.png"
        }]
      }
      this.list = list
      console.log('this.list',this.list)
  }),
  // 切换
  onChange: action(async function (event) {
    wx.switchTab({
      url: this.list[event.detail].url
    });
    this.active = event.detail
  }),
  // 修改权限
  roleChange: action(async function (event) {
    const {roleId} = userStore.userInfo
    this.active = roleId===1?3:2
    this.getList()
  }),
})