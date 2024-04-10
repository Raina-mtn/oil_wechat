// app.ts
import {getToken} from './utils/token'
App<IAppOption>({
  globalData: {
    userInfo:{}
  },
  onLaunch() {
    // const token = getToken()
    // if(token){
    //   wx.switchTab({
    //     url:'/pages/robot/robot'
    //   })
    // }
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
  },
})