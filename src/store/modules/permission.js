import { asyncRoutes, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      let tempData = JSON.parse(JSON.stringify(constantRouterMap))
      let permission = JSON.parse(sessionStorage.getItem('permission'))
      for (let x in tempData) {
        if (tempData[x].hasOwnProperty('children')) {
          for (let y in tempData[x].children) {
            if (tempData[x].children[y].hasOwnProperty('permission')) {
              if (permission.indexOf(tempData[x].children[y].permission) === -1) {
                tempData[x].children[y].hidden = true
              }
            }
          }
        }
      }
      for (let x in tempData) {
        if (tempData[x].hasOwnProperty('children')) {
          let hiddenNum = 0
          for (let y in tempData[x].children) {
            if (tempData[x].children[y].hasOwnProperty('hidden') && tempData[x].children[y].hidden === true) {
              hiddenNum++
            }
          }
          if (hiddenNum === tempData[x].children.length) {
            tempData[x].hidden = true
          }
        }
      }
      state.routes = tempData.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        // let accessedRoutes
        // if (roles.includes('admin')) {
        //   accessedRoutes = asyncRoutes
        // } else {
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // }
        const accessedRoutes = asyncRoutes
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
