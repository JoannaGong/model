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

// 获取数据字典列表（分页）
export function getDataDict(params) { return request({ url: '/dataDictionaryController/dataDictionary', method: 'get', params }) }
// 新增数据字典
export function addDataDict(params) { return request({ url: '/dataDictionaryController/dataDictionary', method: 'post', data: params }) }
// 修改数据字典
export function updateDataDict(params) { return request({ url: '/dataDictionaryController/dataDictionary/' + params.id, method: 'put', data: params }) }
// 删除数据字典
export function delDataDict(params) { return request({ url: '/dataDictionaryController/dataDictionary/' + params.id, method: 'delete', params }) }
// 获取单个数据字典详情
export function getDataDictInfo(params) { return request({ url: '/dataDictionaryController/dataDictionary/' + params.id, method: 'get', params }) }

// 获取用户列表（分页）
export function getUser(params) { return request({ url: '/userController/user', method: 'get', params }) }
// 新增用户
export function addUser(params) { return request({ url: '/userController/user', method: 'post', data: params }) }
// 修改用户
export function updateUser(params) { return request({ url: '/userController/user/' + params.id, method: 'put', data: params }) }
// 删除用户
export function delUser(params) { return request({ url: '/userController/user/' + params.id, method: 'delete', params }) }
// 获取单个用户详情
export function getUserInfo(params) { return request({ url: '/userController/user/' + params.id, method: 'get', params }) }

// 修改角色
export function updateRole(params) { return request({ url: '/permissionController/permission/' + params.id, method: 'put', data: params }) }
// 获取单个用户角色
export function getRoleInfo(params) { return request({ url: '/permissionController/permission/' + params.id, method: 'get', params }) }
// 删除角色
export function delRole(params) { return request({ url: '/permissionController/permission/' + params.id, method: 'delete', params }) }
// 获取角色列表（分页）
export function getRole(params) { return request({ url: '/permissionController/permission', method: 'get', params }) }
// 新增角色
export function addRole(params) { return request({ url: '/permissionController/permission', method: 'post', data: params }) }
// 获取团队会员列表
export function getRoleList(params) { return request({ url: '/permissionController/permissionForAjax', method: 'get', params }) }
// 获取城市列表
export function getAreaList(params) { return request({ url: '/areaController/areaForAjax', method: 'get', params }) }
// 获取权限列表
export function getPermissionList(params) { return request({ url: '/roleDetailsController/roleDetailsForAjax', method: 'get', params }) }

// 获取服务列表（分页）
export function getService(params) { return request({ url: '/professionalServiceRecordController/professionalServiceRecord', method: 'get', params }) }
// 修改服务
export function updateService(params) { return request({ url: '/professionalServiceRecordController/professionalServiceRecord/' + params.id, method: 'put', data: params }) }
// 获取单个服务详情
export function getServiceInfo(params) { return request({ url: '/professionalServiceRecordController/professionalServiceRecord/' + params.id, method: 'get', params }) }
// 获取团队会员列表
export function getServiceList(params) { return request({ url: '/professionalServiceRecordController/professionalServiceRecordForAjax', method: 'get', params }) }

// 获取作品列表（分页）
export function getWork(params) { return request({ url: '/worksController/works', method: 'get', params }) }
// 修改作品
export function updateWork(params) { return request({ url: '/worksController/works/' + params.id, method: 'put', data: params }) }
// 获取单个作品详情
export function getWorkInfo(params) { return request({ url: '/worksController/works/' + params.id, method: 'get', params }) }

// 获取通告列表（分页）
export function getAnnoucement(params) { return request({ url: '/merchantsRecruitingController/merchantsRecruiting', method: 'get', params }) }
// 修改通告
export function updateAnnoucement(params) { return request({ url: '/merchantsRecruitingController/merchantsRecruiting/' + params.id, method: 'put', data: params }) }
// 获取单个通告详情
export function getAnnoucementInfo(params) { return request({ url: '/merchantsRecruitingController/merchantsRecruiting/' + params.id, method: 'get', params }) }
