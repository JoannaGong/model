import request from '@/utils/request'

// 获取会员
export function getMemberList(params) { return request({ url: '/userController/user', method: 'get', params }) }
// 获取会员详情
export function getMemberInfo(params) { return request({ url: '/userController/user/' + params.id, method: 'get', params }) }
// 删除会员
export function delMember(params) { return request({ url: '/userController/user/' + params.id, method: 'delete', params }) }
// 新增会员
export function addMember(params) { return request({ url: '/userController/user', method: 'post', data: params }) }
// 修改会员
export function updateMember(params) { return request({ url: '/userController/user' + params.id, method: 'put', data: params }) }
// 获取团队会员列表
export function getGroupMemberList(params) { return request({ url: '/userController/userForAjax', method: 'get', params }) }

// 获取相册列表
export function getPhotoList(params) { return request({ url: '/userPhotoAlbumController/areaForAjax', method: 'get', params }) }
// 获取相册详情
export function getPhotoInfo(params) { return request({ url: '/userPhotoAlbumController/area/' + params.id, method: 'get', params }) }
