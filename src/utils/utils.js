import _ from 'lodash'
import router from "../router/index";

// 绑定事件 on(element, event, handler)
export function on() {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
}

// 解绑事件 off(element, event, handler)
export function off() {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
}

/**
 * 查找顶部面包屑数据
 * @param {*} path 路由路径
 */
export function findBreadcrumb(path) {
  let str = '';
  let temp = []
  let routerdata = router.options.routes
  //
  for (let i = 0; i < routerdata.length; i++) {
    let objStep1 = {}
    objStep1.path = routerdata[i].path
    objStep1.name = routerdata[i].bname
    temp.push(objStep1)
    if (routerdata[i].children) {
      if (routerdata[i].children.length) {
        for (let j = 0; j < routerdata[i].children.length; j++) {
          // 判断bname是否含有‘/’
          if (routerdata[i].children[j].bname) {
            // 没有'/'--二级菜单
            if (!routerdata[i].children[j].bname.includes('/')) {
              let objStep2 = {}
              objStep2.path = routerdata[i].children[j].path
              objStep2.name = routerdata[i].children[j].bname
              temp.push(objStep2);
            } else {
              let pathdata = _.compact(routerdata[i].children[j].path.split('/'))
              let bnamedata = _.compact(routerdata[i].children[j].bname.split('/'))
              let objStep2 = {}
              objStep2.path = `/${pathdata[0]}/${pathdata[1]}`
              objStep2.name = bnamedata[0]
              temp.push(objStep2);
              let objStep3 = {}
              objStep3.path = routerdata[i].children[j].path
              objStep3.name = bnamedata[1]
              temp.push(objStep3);
            }
          }
        }
      }
    }
  }
  //
  let find = temp.find(item => {
    return item.path === path
  })
  //
  return find ? find.name : '未设置';
}
/**
 * elementUI日期时间组件选出来的中国标准时间转变成字符串
 * @param {*} time 中国标准时间
 */
export function timeStamp2String(time) {
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date;
}
export function utc2Str(time) {
  var datetime = new Date(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  return year + "-" + month + "-" + date;
}
export function dateToString(date) {
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString();
  var day = (date.getDate()).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  var dateTime = year + "-" + month + "-" + day;
  return dateTime;
}
export function dateToAllString(time) {
  var datetime = new Date(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
/**
 * 通过二级路由查找三级所有路由
 * @param {*} path 路由
 * @param {*} menu 菜单数据
 */
export function findThreeLevelMenu(path, menu) {
  // 通过二级路由查找对应的三级路由
  let array = []
  let key = 0
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length) {
      let obj = _.find(menu[i].children, item => {
        return item.value === path
      })
      if (obj && JSON.stringify(obj) !== '{}') {
        key = i
        break
      } else {
        return []
      }
    }
  }
  // push所有三级路由
  for (let i = 0; i < menu[key].children.length; i++) {
    if (
      menu[key].children[i].children &&
      menu[key].children[i].children.length
    ) {
      array.push(menu[key].children[i].value)
    }
  }
  return array
}

/**
 * 通过路径查找路由的对象数据
 * @param {*} path 路径
 * @param {*} menu 菜单数据
 */
export function findRouterData(path, menu) {
  // let obj = {
  //   label: '测试菜单数据',
  //   value: '/admin'
  // }
  let patharray = path.split('/')
  let obj = {}
  // 二级菜单
  if (patharray.length === 3) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].children.length) {
        obj = _.find(menu[i].children, item => {
          return item.value === path
        })
        if (obj && JSON.stringify(obj) !== '{}') {
          return obj
        }
      }
    }
  }
  // 三级菜单
  if (patharray.length === 4) {
    for (let i = 0; i < menu.length; i++) {
      for (let k = 0; k < menu[i].children.length; k++) {
        if (menu[i].children[k].children) {
          let obj = _.find(menu[i].children[k].children, item => {
            return item.value === path
          })
          if (obj && JSON.stringify(obj) !== '{}') {
            return obj
          }
        }
      }
    }
  }
}
// 时间格式化
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

// 多级数组转elementui数组格式
export function exchangeData(data) {
  let newdata = []
  for (let i = 0; i < data.length; i++) {
    let obj1 = {}
    obj1.label = data[i].name
    obj1.value = data[i]._id
    // 二级
    if (data[i].children.length) {
      obj1.children = []
      for (let k = 0; k < data[i].children.length; k++) {
        let obj2 = {}
        obj2.label = data[i].children[k].name
        obj2.value = data[i].children[k]._id
        // 三级
        if (data[i].children[k].children.length) {
          obj2.children = []
          for (let j = 0; j < data[i].children[k].children.length; j++) {
            let obj3 = {}
            obj3.label = data[i].children[k].children[j].name
            obj3.value = data[i].children[k].children[j]._id
            obj2.children.push(obj3)
          }
        }
        obj1.children.push(obj2)
      }
    }
    newdata.push(obj1)
  }
  return newdata
}

// 多级数组转elementui数组格式--咨询模块
export function exchangeModuleInfoData(data) {
  let newdata = []
  for (let i = 0; i < data.length; i++) {
    let obj1 = {}
    obj1.label = data[i].moduleName
    obj1.value = data[i]._id
    // 二级
    if (data[i].children.length) {
      obj1.children = []
      for (let k = 0; k < data[i].children.length; k++) {
        let obj2 = {}
        obj2.label = data[i].children[k].moduleName
        obj2.value = data[i].children[k]._id
        // 三级
        if (data[i].children[k].children.length) {
          obj2.children = []
          for (let j = 0; j < data[i].children[k].children.length; j++) {
            let obj3 = {}
            obj3.label = data[i].children[k].children[j].moduleName
            obj3.value = data[i].children[k].children[j]._id
            obj2.children.push(obj3)
          }
        }
        obj1.children.push(obj2)
      }
    }
    newdata.push(obj1)
  }
  return newdata
}

// 一级数组转elementui数组格式
// TODO..待更新
export function exchangeLevel1Data(data) {
  let newdata = []
  for (let i = 0; i < data.length; i++) {
    let obj = {}
    obj.label = data[i]._id
    obj.value = data[i].name
    newdata.push(obj)
  }
  return newdata
}

export function reExchangeLevel1Data(data) {
  let newdata = []
  for (let i = 0; i < data.length; i++) {
    let obj = {}
    obj.label = data[i].name
    obj.value = data[i]._id
    newdata.push(obj)
  }
  return newdata
}

// 查找三级字段
export function findLevel3Data(data, id) {
  let obj = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length) {
      for (let k = 0; k < data[i].children.length; k++) {
        if (data[i].children[k].children && data[i].children[k].children.length) {
          obj = data[i].children[k].children.find(item => {
            return item.value === id
          })
          if (obj) {
            return obj
          }
        }
      }
    }
  }
}

// 修改商品规格
export function specStr(rule, label, value) {
  let str = ''
  str = rule.replace(label, value)
  return str;
}

//今天开始时间
export function getTodayStart() {
  let date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}
// 时间格式化
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份   
    "d+": this.getDate(),                    //日   
    "h+": this.getHours(),                   //小时   
    "m+": this.getMinutes(),                 //分   
    "s+": this.getSeconds(),                 //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//今天结束时间
export function getTodayEnd() {
  let date = new Date()
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}
