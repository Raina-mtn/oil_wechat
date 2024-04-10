import {request} from '../http'

//获取采样参数
export const apiGetSamplingParameters = function(data:any){
  return request({
      url: '/wechat/getAcquisitionParameters',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}

//采样参数设置
export const apiSetSamplingParameters = function(data:any){
  return request({
      url: '/wechat/acquisitionParametersSet',
      method: 'POST',
      data,
      isLoginRequest:true,
      isNeedRobot:true
  });
}