import {request} from '../http'
//运行日志
export const apiGetLog = function(data:any){
  return request({
      url: '/wechat/getWorkLog',
      method: 'POST',
      data,
      isLoginRequest:true,
  });
}
//运行流程
export const apiGetTaskDetail = function(data:any){
  return request({
      url: '/wechat/getTaskDetail',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}
//氢焰点火
export const apiFireUp = function(data:any){
  return request({
      url: '/wechat/fireUp',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//温控（升温、降温）
export const apiTemControl = function(data:any){
  return request({
      url: '/wechat/temControl',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//桥流控制
export const apiBridgeControl = function(data:any){
  return request({
      url: '/wechat/bridgeGasFlowControl',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//气体
export const apiGetPressure = function(data:any){
  return request({
      url: '/wechat/getRealTimePressure',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}
//温控
export const apiGetTemporary = function(data:any){
  return request({
      url: '/wechat/getRealTimeTem',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}
//其他状态
export const apiGetOtherState = function(data:any){
  return request({
      url: '/wechat/getOtherState',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}
// 参数设置
//设置温度
export const apiSetTemporary = function(data:any){
  return request({
      url: '/wechat/setTem',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//设置桥流
export const apiSetBridge = function(data:any){
  return request({
      url: '/wechat/setBridgeGasFlow',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//获取温度设置参数
export const apiGetTem = function(data:any){
  return request({
      url: '/wechat/getTem',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//获取桥流设置参数
export const apiGetBridge = function(data:any){
  return request({
      url: '/wechat/getBridgeGasFlow',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//获取最新谱图
export const apiGetLatestChromatogram = function(data:any){
  return request({
      url: '/wechat/getLatestChromatogram',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//获取历史记录库
export const apiGetHistoryRecordList = function(data:any){
  return request({
      url: '/wechat/getTaskOutCome',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}
//获取样品谱图库
export const apiGetSampleChromatogramDatabase = function(data:any){
  return request({
      url: '/wechat/getSampleChromatogramDatabase',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}

//根据文件名获取谱图
export const apiGetChromatogram = function(data:any){
  return request({
      url: '/wechat/getChromatogram',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}


//获取计算参数
export const apiGetCalculationParameters = function(data:any){
  return request({
      url: '/wechat/getCalculationParameters',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}

// 获取计算方式
export const apiGetCalculationMethod = function(data:any){
  return request({
      url: '/wechat/getCalculationMethod',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}

// 设置计算方式
export const apiSetCalculationMethod = function(data:any){
  return request({
      url: '/wechat/setCalculationMethod',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}