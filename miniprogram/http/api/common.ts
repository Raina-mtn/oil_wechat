import {request} from '../http'

//获取设备台账
export const apiGetDeviceList = function(data:any){
  return request({
      url: '/wechat/getDeviceInfos',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:false
  });
}

// 获取单位信息
export const apiGetOrganizations = function(data:any){
  return request({
      url: '/wechat/getOrganizations',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}

// 获取设备类型
export const apiGetDeviceTypes = function(data:any){
  return request({
      url: '/wechat/getDeviceTypes',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}