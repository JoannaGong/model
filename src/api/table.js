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
// 获取标签详情
export function getLabel(params) { return request({ url: '/lableController/lable/' + params.id, method: 'get', params }) }
// 获取模特作品详情
export function getWorks(params) { return request({ url: '/worksController/works/' + params.id, method: 'get', params }) }

// 获取拍摄地列表（分页）
export function getLocation(params) { return request({ url: '/shootingPlaceController/shootingPlace', method: 'get', params }) }
// 新增拍摄地
export function addLocation(params) { return request({ url: '/shootingPlaceController/shootingPlace', method: 'post', data: params }) }
// 修改拍摄地
export function updateLocation(params) { return request({ url: '/shootingPlaceController/shootingPlace/' + params.id, method: 'put', data: params }) }
// 删除拍摄地
export function delLocation(params) { return request({ url: '/shootingPlaceController/shootingPlace/' + params.id, method: 'delete', params }) }
// 获取单个拍摄地详情
export function getLocationInfo(params) { return request({ url: '/shootingPlaceController/shootingPlace/' + params.id, method: 'get', params }) }

