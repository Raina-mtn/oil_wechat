import {request} from '../http'
// 获取任务列表
export const apiGetTaskList = function(){
  return request({
    url: '/wechat/getTaskList',
    method: 'POST'
  });
}

// 获取设备台账
export const apiGetDevices = function(data){
  return request({
    url: '/wechat/getDeviceInfos',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}

// 下发实时任务
export const apiIssueTask = function(data){
  return request({
    url: '/wechat/issueTask',
    method: 'POST',
    timeout:30*1000,
    data,
    isNeedRobot:true
  });
}
// 下发周期任务
export const apiIssueCycleTask = function(data){
  return request({
    url: '/wechat/issueCycleTask',
    method: 'POST',
    timeout:30*1000,
    data,
    isNeedRobot:true
  });
}
// 添加收藏任务
export const apiAddFavoriteTask = function(data){
  return request({
    url: '/wechat/addFavoriteTask',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}
// 获取收藏任务
export const apiGetFavoriteTasks = function(data){
  return request({
    url: '/wechat/getFavoriteTasks',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}
// 删除收藏任务
export const apiDeleteFavoriteTask = function(data){
  return request({
    url: '/wechat/deleteFavoriteTask',
    method: 'POST',
    data
  });
}
// 获取周期任务
export const apiGetCycleTask = function(data){
  return request({
    url: '/wechat/getCycleTask',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}
// 删除周期任务
export const apiDeleteCycleTask = function(data){
  return request({
    url: '/wechat/cancelCycleTask',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}
// 获取历史任务列表
export const apiGetHistoryTaskList = function(data){
  return request({
    url: '/wechat/getTaskList',
    method: 'POST',
    data,
    isNeedRobot:true
  });
}
