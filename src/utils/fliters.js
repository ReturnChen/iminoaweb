export const goodFilterStatus = val => {
  switch (val) {
    case 1:
      return '编辑中'
      break
    case 10:
      return '待审核商品信息'
      break
    case 11:
      return '商品信息审核未通过'
      break
    case 12:
      return '商品信息审核通过'
      break
    case 20:
      return '上架初审'
      break
    case 21:
      return '上架初审未通过'
      break
    case 22:
      return '上架复审'
      break
    case 23:
      return '上架复审未通过'
      break
    case 24:
      return '上架终审'
      break
    case 25:
      return '上架终审未通过'
      break
    case 30:
      return '审核通过，已上架'
      break
    case 40:
      return '已下架'
      break
    case 50:
      return '上架已到期'
      break
    case 60:
      return '上架未到期'
      break
    case 70:
      return '下架已到期'
      break
    case 80:
      return '下架未到期'
      break
    default:
      return '无效值'
      break
  }
}

export const contentFilterStatus = val => {
  switch (val) {
    case 10:
      return '待审核'
      break
    case 11:
      return '初审'
      break
    case 12:
      return '初审未通过'
      break
    case 20:
      return '复审'
      break
    case 21:
      return '复审未通过'
      break
    case 30:
      return '已发布'
      break
    case 31:
      return '未发布'
      break
    default:
      return '无效值'
      break
  }
}
