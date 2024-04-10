import {request} from '../http'
//登录
export const apiLogin = function(data:any){
  return request({
      url: '/wechat/login',
      method: 'POST',
      data,
      isLoginRequest:true
  });
}