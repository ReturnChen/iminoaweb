import Home from '../views/home/layout.vue'

export default {
  path: '/case',
  name: 'case',
  bname: '案件管理',
  component: Home,
  redirect: '/case/addcase',
  children: [
    {
      path: '/case/addcase',
      name: 'caseaddcase',
      bname: '案件申请',
      component: () =>
        import('../views/case/addcase/index.vue'),
    },
    {
      path: '/case/caseexamine',
      name: 'casecaseexamine',
      bname: '案件审核',
      component: () =>
        import('../views/case/caseexamine/index.vue'),
    }
  ],
}
