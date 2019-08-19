import Home from '../views/home/layout.vue'

export default {
  path: '/system',
  name: 'system',
  bname: '系统管理',
  component: Home,
  redirect: '/system/systemauth/user',
  children: [
    {
      path: '/system/systemauth/user',
      name: 'systemuser',
      bname: '用户权限/用户管理',
      component: () =>
        import('../views/system/user/index.vue'),
    }
  ],
}
