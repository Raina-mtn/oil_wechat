import {Request} from './interface'
const errorCode = ['06']

const ui = require('../utils/toast');
const BASE_URL = 'https://oil.shinforobot.com'
import { store } from '@store/user'

/**
 * 网络请求request
 * obj.data 请求接口需要传递的数据 
 * obj.showLoading 控制是否显示加载Loading 默认为false不显示
 * obj.contentType 默认为 application/json
 * obj.method 请求的方法  默认为GET
 * obj.url 请求的接口路径 
 * obj.message 加载数据提示语
 */
export function request({url,method='POST',timeout=60000, config={}, data={}, isLoginRequest=false,isNeedRobot=false}) {
  return new Promise(async (resolve, reject)=>{
      const prevPages = getCurrentPages() // 当前打开的所有页面
      const currentPage = prevPages[prevPages.length-1].route
      if(!wx.getStorageSync('shenhao-token').data && !isLoginRequest){ // 未登录先去登录
        wx.switchTab({ url: '/pages/login/login' })
      }
      const token = wx.getStorageSync('shenhao-token')
      const header = url==='/wechat/login'?{
        'Content-Type': 'application/json',
        ...config.header,
      }:{
          'Content-Type': 'application/json',
          ...config.header,
          token
      }
      // Content-Type为application/json时，data参数只支持json字符串，用户需要手动调用JSON.stringify进行序列化
      // let params = {...data}
      // if(header['Content-Type'] === 'application/json') {
      //     params = JSON.stringify(params)
      //  }

      let params = {}
      //如果isNeedRobot===true，则需要带上workstationId
      if(isNeedRobot){
        const workstationId = store.currentRobot?.workstationId
        if(workstationId){
          params = {
            ...data,
            workstationId
          }
        }else{
          ui.showToast('请选择机器人！')
          return;
        } 
      }else{
        params = data
      }
      wx.request({
          url: `${BASE_URL}${url}`,
          method,
          data:params,
          dataType: 'json',
          header,
          timeout,
          success: function(res){
            let msg = ''
            const {resultCode,message,data} = res.data
            msg = message
            if(res.statusCode === 200){ // 请求成功
                if(resultCode === 1){ // 接口正确返回状态码
                    resolve(data)
                }else{
                  reject(msg)
                  ui.showToast(msg)
                }
            }else if(res.statusCode === 401){
              store.logout()
              ui.showToast('token失效，请重新登录！')
            }else{
              if(res.statusCode === 404){
                msg = '接口不存在！'
              }
              reject(msg)
              ui.showToast(msg)
            }
          },
          fail: function({errMsg,errno}){ // 请求失败
              const pages = getCurrentPages()
              if(!pages.find(l=>l.route === currentPage)) return ; // 由于页面销毁导致的请求出错（用户快速后退）
              if(errorCode.includes(errno)){ // 网络问题
                  // 跳转到网络错误页
              }
              reject(errMsg)
              ui.showToast(errMsg)
          }
      })
  })
  }
  

  //跳转到登录页
  function jumpToLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
  