import {request} from '../http'
//获取机器人列表
export const apiGetRobotList = function(){
  return request({
      url: '/wechat/getRobotList',
      method: 'POST'
  });
}
//获取任务状态
export const apiGetTaskInfo = function(){
  return request({
      url: '/wechat/getTaskInfo',
      method: 'POST',
      isNeedRobot:true
  });
}
//打开机器人罩壳
export const apiControlRobotShell = function(data:any){
  return request({
      url: '/wechat/robotShellControl',
      method: 'POST',
      data,
      isNeedRobot:true
  });
}
//自锁
export const apiControlLock = function(data:any){
  return request({
      url: '/wechat/lockControl',
      method: 'POST',
      data,
      isNeedRobot:true
  });
}
//补光灯
export const apiControlLight = function(data:any){
  return request({
      url: '/wechat/lightControl',
      method: 'POST',
      data,
      isNeedRobot:true
  });
}
//打开取油桩罩壳
export const apiControlPileShell = function(data:any){
  return request({
      url: '/wechat/pileShellControl',
      method: 'POST',
      data,
      isNeedRobot:true
  });
}
//一键终止
export const apiTerminateTask = function(){
  return request({
      url: '/wechat/terminateTask',
      method: 'POST',
      isNeedRobot:true
  });
}
//一键充电
export const apiCharge = function(data:any){
  return request({
      url: '/wechat/goCharge',
      method: 'POST',
      data,
      isNeedRobot:true
  });
}
//获取机器人实时照片
export const apiGetRealTimePicture = function(data:any){
  return request({
      url: '/wechat/getRealTimePicture',
      method: 'POST',
      data,
      isNeedRobot:true,
      timeout:1000*60*5
  });
}

//新增机器人
export const apiAddRobot = function(data:any){
  return request({
      url: '/wechat/addRobot',
      method: 'POST',
      data
  });
}

//编辑机器人
export const apiEditRobot = function(data:any){
  return request({
      url: '/wechat/updateRobot',
      method: 'POST',
      data
  });
}

//更多图片
export const apiGetPictures = function(data:any){
  return request({
      url: '/wechat/getPictures',
      method: 'POST',
      data,
      isNeedRobot:true,
  });
}
//删除图片
export const apiDeletePictures = function(data:any){
  return request({
      url: '/wechat/deletePictures',
      method: 'POST',
      data,
      isNeedRobot:true,
  });
}