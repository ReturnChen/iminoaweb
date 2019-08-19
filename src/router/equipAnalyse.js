import Home from '../views/home/layout.vue'

export default {
  path: '/equipanalyse',
  name: 'equipAnalyse',
  bname: '设备分析',
  component: Home,
  redirect: '/equipanalyse/alarmreport',
  children: [
    {
      path: '/equipanalyse/alarmreport',
      name: 'equipAnalysealarmreport',
      bname: '告警明细统计',
      component: () =>
        import('../views/equipAnalyse/alarmreport/index.vue'),
    }
  ],
}
