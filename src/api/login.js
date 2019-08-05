import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: '/loginController/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/loginController/getUserInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/loginController/logout',
    method: 'post'
  })
}

// 修改当前登录用户密码
export function updatePassword(params) {
  return request({
    url: '/loginController/updatePass',
    method: 'post',
    data: params
  })
}
