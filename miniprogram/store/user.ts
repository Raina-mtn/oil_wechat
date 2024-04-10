import { observable, action } from 'mobx-miniprogram'
import {setToken,removeToken,setRobot,getRobot,removeRobot,setUser,getUser} from '@utils/token'
import {apiLogin} from '@http/api/login'
import {apiGetRobotList} from '@http/api/robot'
import {apiGetCurrentUser} from '@http/api/usersmanage'

// 数据仓库-用户
export const store =observable({
  userInfo: {}, // 用户数据
  currentRobot:null, // 当前选中的机器人
   // 机器人列表
  robotList:[],
  // 登录
  login: action(async function (data) {
    // 登录
    const {token} = await apiLogin(data)
    setToken(token)
    // 获取用户信息
    await this.getUserInfo();
    wx.switchTab({ url: '/pages/robot/robot' })
  }),
  // 登出
  logout: action(async function () {
    removeToken()
    // wx.redirectTo({url:'/pages/login/login'})
    // 如果修改了职务 自定义tabbar不会重新载入，所以最好是推荐用reLaunch，关闭所有页面到login
    wx.reLaunch({url:'/pages/login/login'})
    removeRobot()
    this.robotList = []
  }),
  // 获取用户信息
  getUserInfo: action(async function () {
    const data = await apiGetCurrentUser();      
    this.userInfo = data
    setUser(data);
    return data
  }),
  // 更换机器人
  setCurrentRobot: action(async function (currentRobot) {
    this.currentRobot = currentRobot
    setRobot(currentRobot);
  }),
  // 获取机器人列表
  getRobotList: action(async function () {
    this.robotList = await apiGetRobotList()
    // 默认选中第一个机器人
    this.currentRobot = this.robotList[0] || {}
    const robotInfo = getRobot()
    if(!robotInfo){
      setRobot(this.robotList[0] || {})
    }else{
      setRobot(robotInfo)
      this.setCurrentRobot(robotInfo)
    }
  }),
})