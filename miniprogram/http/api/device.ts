import {request} from '../http'

//删除设备
export const apiDeleteDevice = function(data:any){
  return request({
      url: '/wechat/deleteDevice',
      method: 'POST',
      data
  });
}
//添加设备
export const apiAddDevice = function(data:any){
  return request({
      url: '/wechat/addDevice',
      method: 'POST',
      data
  });
}
//更新设备
export const apiEditDevice = function(data:any){
  return request({
      url: '/wechat/updateDevice',
      method: 'POST',
      data
  });
}