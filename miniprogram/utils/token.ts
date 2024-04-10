export const TokenKey = 'shenhao-token'
export const RobotKey = 'shenhao-robot'
export const UserKey = 'shenhao-user'
export function setToken(token:string) {
  wx.setStorageSync(TokenKey,token)
}
export function getToken() {
  return wx.getStorageSync(TokenKey)
}
export function removeToken() {
  wx.removeStorageSync(TokenKey)
}
// 当前选中机器人
export function setRobot(robot) {
  wx.setStorageSync(RobotKey,robot)
}
export function getRobot() {
  return wx.getStorageSync(RobotKey)
}
export function removeRobot() {
  wx.removeStorageSync(RobotKey)
}
// 当前用户信息
export function setUser(userInfo) {
  wx.setStorageSync(UserKey,userInfo)
}
export function getUser() {
  return wx.getStorageSync(UserKey)
}
export function removeUser() {
  wx.removeStorageSync(UserKey)
}