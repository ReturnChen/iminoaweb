export const adminmenu = [
  {
    label: '案件管理',
    value: 'case',
    icon: 'el-icon-suitcase',
    children: [
      {
        label: '案件申请',
        value: '/case/addcase'
      },
      {
        label: '案件审核',
        value: '/case/caseexamine'
      },
      // {
      //   label: '案件审批',
      //   value: '/case/caseapprove'
      // },
      // {
      //   label: '案件结案',
      //   value: '/case/closecase'
      // },
      // {
      //   label: '警员管理',
      //   value: '/case/officer'
      // }
    ]
  },
  {
    label: '业务分析',
    value: 'business',
    icon: 'el-icon-c-scale-to-original',
    children: [
      {
        label: '号码碰撞',
        value: '/business/numcollision'
      }
    ]  
  },
  {
    label: '重点人员管控',
    value: 'case2',
    icon: 'el-icon-user'
  },
  {
    label: '设备告警管控',
    value: 'case3',
    icon: 'el-icon-warning-outline'
  },
  {
    label: '设备分析',
    value: 'equipanalyse',
    icon: 'el-icon-copy-document',
    children: [
      {
        label: '告警明细统计',
        value: '/equipanalyse/alarmreport'
      }
    ]  
  },
  {
    label: '设备管理',
    value: 'case5',
    icon: 'el-icon-mobile-phone'
  },
  {
    label: '自动巡检管理',
    value: 'case6',
    icon: 'el-icon-connection'
  },
  {
    label: '运维管理',
    value: 'case7',
    icon: 'el-icon-cpu'
  },
  {
    label: '第三方数据',
    value: 'case8',
    icon: 'el-icon-pie-chart'
  },
  {
    label: '报表统计',
    value: 'case9',
    icon: 'el-icon-document'
  },
  {
    label: '外线软件管理',
    value: 'case11',
    icon: 'el-icon-guide'
  },
  {
    label: '系统管理',
    value: 'system',
    icon: 'el-icon-setting',
    children: [
      {
        label: '用户权限',
        value: 'systemauth',
        children: [
          {
            label: '用户管理',
            value: '/system/systemauth/user'
          },
          // {
          //   label: '角色管理',
          //   value: '/system/role'
          // },
          // {
          //   label: '菜单管理',
          //   value: '/system/menu'
          // },
          // {
          //   label: '单位管理',
          //   value: '/system/unit'
          // }
        ]
      },
      // {
      //   label: '参数管理',
      //   value: '/system/param'
      // },
      // {
      //   label: '系统日志',
      //   value: '/system/log'
      // },
      // {
      //   label: '基站数据查询',
      //   value: '/system/basestation'
      // },
      // {
      //   label: '执法监督',
      //   value: 'systemitem2',
      //   children: [
      //     {
      //       label: '黑匣子数据',
      //       value: '/system/blackbox'
      //     },
      //     {
      //       label: '案件导出',
      //       value: '/system/caseexport'
      //     },
      //     {
      //       label: '案件导入',
      //       value: '/system/caseimport'
      //     },
      //     {
      //       label: '案件申请查询',
      //       value: '/system/caseinquiry'
      //     }
      //   ]
      // }
    ]
  },
]
