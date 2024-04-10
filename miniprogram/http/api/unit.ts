import {request} from '../http'

//获取单位和变电站信息
export const apiGetOrgTree = function(data:any){
  return request({
      url: '/wechat/getOrganizationAndSubstationTree',
      method: 'POST',
      data,
  });
}

// 新增单位
export const apiAddOrganization = function(data:any){
  return request({
      url: '/wechat/addOrganization',
      method: 'POST',
      data,
  });
}

// 修改单位
export const apiUpdateOrganization = function(data:any){
  return request({
      url: '/wechat/updateOrganization',
      method: 'POST',
      data,
  });
}

// 添加变电站
export const apiAddSubstation = function(data:any){
  return request({
      url: '/wechat/addSubstation',
      method: 'POST',
      data,
  });
}

// 修改变电站
export const apiUpdateSubstation = function(data:any){
  return request({
      url: '/wechat/updateSubstation',
      method: 'POST',
      data,
  });
}
