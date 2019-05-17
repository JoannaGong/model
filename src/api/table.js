import request from '@/utils/request'
export function getList(params) { return request({ url: '/members', method: 'get', params }) }
// 获取图片上传参数
export function getUploadParams(params) { return request({ url: '/getOssParams', method: 'get', params }) }
// 获取会员
export function getMemberList(params) { return request({ url: '/members', method: 'get', params }) }
// 获取会员详情
export function getMemberInfo(params) { return request({ url: '/members/' + params.id, method: 'get', params }) }
// 删除会员
export function delMember(params) { return request({ url: '/members/' + params.id, method: 'delete', params }) }
// 新增会员
export function addMember(params) { return request({ url: '/members', method: 'post', data: params }) }
// 修改会员
export function updateMember(params) { return request({ url: '/members/' + params.id, method: 'patch', data: params }) }
// 获取团队会员列表
export function getGroupMemberList(params) { return request({ url: '/getGroupMemberList', method: 'get', params }) }

// 获取活动成果列表
export function getAccList(params) { return request({ url: '/members', method: 'get', params }) }
// 删除活动类型
export function delMember1(params) { return request({ url: '/members/' + params.id, method: 'delete', params }) }
/** -----------活动内容管理---------- */
// 活动内容新增
export function addActivities(params) { return request({ url: '/activities', method: 'post', data: params }) }
// 活动内容修改
export function updateActivities(params) { return request({ url: '/activities/' + params.id, method: 'patch', data: params }) }
// 活动内容删除
export function delActivities(params) { return request({ url: '/activities/' + params.id, method: 'delete', params }) }
// 活动内容列表
export function getActivities(params) { return request({ url: '/activities', method: 'get', params }) }
// 活动内容详情
export function getActivitiesInfo(params) { return request({ url: '/activities/' + params.id, method: 'get', params }) }

/** -----------活动报名管理---------- */
// 活动报名新增
export function addSignups(params) { return request({ url: '/signups', method: 'post', data: params }) }
// 活动报名修改
export function updateSignups(params) { return request({ url: '/signups/' + params.id, method: 'patch', data: params }) }
// 活动报名删除
export function delSignups(params) { return request({ url: '/signups/' + params.id, method: 'delete', params }) }
// 活动报名列表
export function getSignups(params) { return request({ url: '/signups', method: 'get', params }) }
// 活动报名详情
export function getSignupsInfo(params) { return request({ url: '/signups/' + params.id, method: 'get', params }) }

/** -----------积分管理---------- */
// 积分申请列表
export function getIntegralApply(params) { return request({ url: '/integralApplications', method: 'get', params }) }
// 积分申请详情
export function getIntegralApplyInfo(params) { return request({ url: '/integralApplications/' + params.id, method: 'get', params }) }
// 积分等级新增
export function addIntegralLevel(params) { return request({ url: '/integralLevels', method: 'post', data: params }) }
// 积分等级修改
export function updateIntegralLevel(params) { return request({ url: '/integralLevels/' + params.id, method: 'patch', data: params }) }
// 积分等级删除
export function delIntegralLevel(params) { return request({ url: '/integralLevels/' + params.id, method: 'delete', params }) }
// 积分等级列表
export function getIntegralLevel(params) { return request({ url: '/integralLevels', method: 'get', params }) }
// 积分详情
export function getIntegralLevelInfo(params) { return request({ url: '/integralLevels/' + params.id, method: 'get', params }) }
// 积分审核
export function updateIntegral(params) { return request({ url: '/integralApplications/' + params.id, method: 'patch', data: params }) }
/** -----------积分商品---------- */
// 积分商品新增
export function addIntegralGoods(params) { return request({ url: '/integralGoods', method: 'post', data: params }) }
// 积分商品修改
export function updateIntegralGoods(params) { return request({ url: '/integralGoods/' + params.id, method: 'patch', data: params }) }
// 积分商品删除
export function delIntegralGoods(params) { return request({ url: '/integralGoods/' + params.id, method: 'delete', params }) }
// 积分商品列表
export function getIntegralGoods(params) { return request({ url: '/integralGoods', method: 'get', params }) }
// 积分商品详情
export function getIntegralGoodsInfo(params) { return request({ url: '/integralGoods/' + params.id, method: 'get', params }) }
/** -----------积分订单---------- */
// 获取积分订单列表
export function getIntegralOrder(params) { return request({ url: '/integralOrders/', method: 'get', params }) }
// 获取积分详情
export function getIntegralOrderInfo(params) { return request({ url: '/integralOrders/' + params.id, method: 'get', params }) }
// 取消订单
export function cancelIntegralOrder(params) { return request({ url: '/cancelOrder/', method: 'get', params }) }
// 发货
export function deliverIntegralOrder(params) { return request({ url: '/deliver/', method: 'post', data: params }) }
/** -----------团体管理---------- */
// 获取团体列表
export function getGroupList(params) { return request({ url: '/groups/', method: 'get', params }) }
// 获取企业列表
export function getEnterpriseList(params) { return request({ url: '/getEnterpriseList/', method: 'get', params }) }
// 获取组织列表
export function getOrgList(params) { return request({ url: '/getOrganizationList/', method: 'get', params }) }
// 新建团体
export function addGroup(params) { return request({ url: '/groups', method: 'post', data: params }) }
// 修改团体
export function updateGroup(params) { return request({ url: '/groups/' + params.id, method: 'patch', data: params }) }
// 删除团体
export function delGroup(params) { return request({ url: '/groups/' + params.id, method: 'delete', params }) }
// 获取团体详情
export function getGroupInfo(params) { return request({ url: '/groups/' + params.id, method: 'get', params }) }
/** -----------数据字典---------- */
// 获取数据字典列表
export function getDictionariesList(params) { return request({ url: '/dataDictionaries/', method: 'get', params }) }
// 新建数据字典
export function addDictionaries(params) { return request({ url: '/dataDictionaries', method: 'post', data: params }) }
// 修改数据字典
export function updateDictionaries(params) { return request({ url: '/dataDictionaries/' + params.id, method: 'patch', data: params }) }
// 删除数据字典
export function delDictionaries(params) { return request({ url: '/dataDictionaries/' + params.id, method: 'delete', params }) }
// 获取数据字典详情
export function getDictionariesInfo(params) { return request({ url: '/dataDictionaries/' + params.id, method: 'get', params }) }
/** -----------项目---------- */
// 获取项目列表
export function getProjectsList(params) { return request({ url: '/projects/', method: 'get', params }) }
// 新建项目
export function addProjects(params) { return request({ url: '/projects', method: 'post', data: params }) }
// 修改项目
export function updateProjects(params) { return request({ url: '/projects/' + params.id, method: 'patch', data: params }) }
// 删除项目
export function delProjects(params) { return request({ url: '/projects/' + params.id, method: 'delete', params }) }
// 获取项目详情
export function getProjectsInfo(params) { return request({ url: '/projects/' + params.id, method: 'get', params }) }
/** -----------报名表---------- */
export function getSignupList(params) { return request({ url: '/signupForms/', method: 'get', params }) }
// 新建报名表
export function addSignup(params) { return request({ url: '/signupForms', method: 'post', data: params }) }
// 修改报名表
export function updateSignup(params) { return request({ url: '/signupForms/' + params.id, method: 'patch', data: params }) }
// 删除报名表
export function delSignup(params) { return request({ url: '/signupForms/' + params.id, method: 'delete', params }) }
// 获取报名表详情
export function getSignupInfo(params) { return request({ url: '/signupForms/' + params.id, method: 'get', params }) }
/** -----------流程配置---------- */
export function getProcessList(params) { return request({ url: '/flows/', method: 'get', params }) }
// 新建流程
export function addProcess(params) { return request({ url: '/flows', method: 'post', data: params }) }
// 修改流程
export function updateProcess(params) { return request({ url: '/flows/' + params.id, method: 'patch', data: params }) }
// 删除流程
export function delProcess(params) { return request({ url: '/flows/' + params.id, method: 'delete', params }) }
// 获取流程详情
export function getProcessInfo(params) { return request({ url: '/flows/' + params.id, method: 'get', params }) }
/** -----------其他---------- */
// 获取活动成员
export function getActivitiesMember(params) { return request({ url: '/getMemberListByActivity/', method: 'get', params }) }
// 结束活动
export function stopActivities(params) { return request({ url: '/endActivity', method: 'post', data: params }) }
// 报名申请管理
export function getSignupsList(params) { return request({ url: '/signups/', method: 'get', params }) }
// 报名详情
export function getEnrollInfo(params) { return request({ url: '/signups/' + params.id, method: 'get', params }) }
// 更新报名
export function updateEnroll(params) { return request({ url: '/signups/' + params.id, method: 'patch', data: params }) }
/** -----------报名申请变更---------- */
export function getChangeApplicationsList(params) { return request({ url: '/changeApplications/', method: 'get', params }) }
// 新建流程
export function addChangeApplications(params) { return request({ url: '/changeApplications', method: 'post', data: params }) }
// 修改流程
export function updateChangeApplications(params) { return request({ url: '/changeApplications/' + params.id, method: 'patch', data: params }) }
// 删除流程
export function delChangeApplications(params) { return request({ url: '/changeApplications/' + params.id, method: 'delete', params }) }
// 获取流程详情
export function getChangeApplicationsInfo(params) { return request({ url: '/changeApplications/' + params.id, method: 'get', params }) }
/** -----------黑名单---------- */
export function getBlackList(params) { return request({ url: '/blackLists/', method: 'get', params }) }
// 新建报名表
export function addBlack(params) { return request({ url: '/blackLists', method: 'post', data: params }) }
// 修改报名表
export function updateBlack(params) { return request({ url: '/blackLists/' + params.id, method: 'patch', data: params }) }
// 删除报名表
export function delBlack(params) { return request({ url: '/blackLists/' + params.id, method: 'delete', params }) }
// 获取报名表详情
export function getBlackInfo(params) { return request({ url: '/blackLists/' + params.id, method: 'get', params }) }
/** -----------导入---------- */
// 月捐列表
export function getMonthlyDonations(params) { return request({ url: '/monthlyDonations/', method: 'get', params }) }
// 成员列表
export function getTempMembers(params) { return request({ url: '/tempMembers/', method: 'get', params }) }
/** -----------后台用户---------- */
export function getAccountsList(params) { return request({ url: '/accounts/', method: 'get', params }) }
export function addAccounts(params) { return request({ url: '/accounts', method: 'post', data: params }) }
export function updateAccounts(params) { return request({ url: '/accounts/' + params.id, method: 'patch', data: params }) }
export function delAccounts(params) { return request({ url: '/accounts/' + params.id, method: 'delete', params }) }
export function getAccountsInfo(params) { return request({ url: '/accounts/' + params.id, method: 'get', params }) }
/** -----------角色管理---------- */
export function getRolesList(params) { return request({ url: '/roles/', method: 'get', params }) }
export function addRoles(params) { return request({ url: '/roles', method: 'post', data: params }) }
export function updateRoles(params) { return request({ url: '/roles/' + params.id, method: 'patch', data: params }) }
export function delRoles(params) { return request({ url: '/roles/' + params.id, method: 'delete', params }) }
export function getRolesInfo(params) { return request({ url: '/roles/' + params.id, method: 'get', params }) }
/** ----------权限---------- */
export function getPermissionList(params) { return request({ url: '/getPermissionList', method: 'get', params }) }
/** -----------邮件管理---------- */
export function getMailTemplatesList(params) { return request({ url: '/mailTemplates/', method: 'get', params }) }
export function addMailTemplates(params) { return request({ url: '/mailTemplates', method: 'post', data: params }) }
export function updateMailTemplates(params) { return request({ url: '/mailTemplates/' + params.id, method: 'patch', data: params }) }
export function delMailTemplates(params) { return request({ url: '/mailTemplates/' + params.id, method: 'delete', params }) }
export function getMailTemplatesInfo(params) { return request({ url: '/mailTemplates/' + params.id, method: 'get', params }) }
/** -----------事件提醒---------- */
export function getEventsList(params) { return request({ url: '/events/', method: 'get', params }) }
export function addEvents(params) { return request({ url: '/events', method: 'post', data: params }) }
export function updateEvents(params) { return request({ url: '/events/' + params.id, method: 'patch', data: params }) }
export function delEvents(params) { return request({ url: '/events/' + params.id, method: 'delete', params }) }
export function getEventsInfo(params) { return request({ url: '/events/' + params.id, method: 'get', params }) }
export function getUnreadEventCount(params) { return request({ url: '/getUnreadEventCount', method: 'get', params }) }
/** -----------标签---------- */
export function getTagsList(params) { return request({ url: '/tags/', method: 'get', params }) }
export function addTags(params) { return request({ url: '/tags', method: 'post', data: params }) }
export function updateTags(params) { return request({ url: '/tags/' + params.id, method: 'patch', data: params }) }
export function delTags(params) { return request({ url: '/tags/' + params.id, method: 'delete', params }) }
export function getTagsInfo(params) { return request({ url: '/tags/' + params.id, method: 'get', params }) }
// 获取后台账户详情
export function getUserInfo(params) { return request({ url: '/getAccountInfo/', method: 'get', params }) }
// 修改后台账号密码
export function updatePassword(params) { return request({ url: '/updatePassword', method: 'post', data: params }) }
// 导出
export function exportSignup(params) { return request({ url: '/exportSignupMembers/', method: 'get', params }) }
