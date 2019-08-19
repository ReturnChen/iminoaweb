import Home from '../views/home/layout.vue'

export default {
  path: '/business',
  name: 'business',
  bname: '业务分析',
  component: Home,
  redirect: '/business/numcollision',
  children: [
    {
      path: '/business/numcollision',
      name: 'businessnumcollision',
      bname: '号码碰撞',
      component: () =>
        import('../views/business/numcollision/index.vue'),
    }
  ],
}
