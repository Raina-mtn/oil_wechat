import {request} from '../http'

// 获取用户信息
export const apiGetUsersInfo = function (data:any) {
    return  request({
        url:'/wechat/getUsers',
        method:'POST',
        data
    })
}
// 获取职务信息
export const apiGetRoles = function () {
    return request({
        url:'/wechat/getRoles',
        method:'POST'
    })
}
// 获取单位信息
export const apiGetOrganizations = function () {
    return request({
        url:'/wechat/getOrganizations',
        method:'POST'
    })
}

// 删除用户
export const apiDeleteUser = function (data:any) {
    return request({
        url:'/wechat/deleteUser',
        method:'POST',
        data
    })
}

// 添加用户
export const apiAddUser = function (data:any) {
    return request({
        url:'/wechat/addUser',
        method:'POST',
        data
    })
}

// 修改用户信息，编辑
 export const apiUpdateUser = function (data:any) {
     return request({
         url:'/wechat/updateUser',
         method:'POST',
         data
     })
 }

 
// 获取当前用户信息
export const apiGetCurrentUser = function (data:any) {
  return request({
      url:'/wechat/getCurrentUser',
      method:'POST',
      data
  })
}

// 修改密码
export const apiUpdateUserPassword = function (data:any) {
  return request({
      url:'/wechat/updateUserPassword',
      method:'POST',
      data
  })
}

//  重置密码
export const apiResetPassword = function (data:any) {
  return request({
      url:'/wechat/resetPassword',
      method:'POST',
      data,
      isLoginRequest:true
  })
}