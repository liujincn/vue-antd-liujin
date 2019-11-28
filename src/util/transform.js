export function transformData (value, arr) {
  if (value === undefined || value === null || value === '') {
    return value
  } else {
    for (let item of arr) {
      if (value === item.id) {
        return item.name
      }
    }
  }
}

export function transformArray (item, source) {
  var data = ''
  if (item.length === 0) {
    data = '所有'
  } else {
    for (let i = 0, len = item.length; i < len; i++) {
      for (let j = 0, len = source.length; j < len; j++) {
        if (item[i] === source[j].id) {
          data += source[j].name + '；'
        }
      }
    }
  }
  return data
}

export function transformContent (item) {
  var content = ''
  for (let i = 0, len = item.length; i < len; i++) {
    content += item[i].desc + '：' + item[i].content + '；'
  }
  return content
}

export function transformGoods (item) {
  var goods = ''
  for (let i = 0, len = item.length; i < len; i++) {
    goods += '物品ID：' + item[i].id + '&数量' + item[i].num + '；'
  }
  return goods
}

export function transMail (item, source) {
  var mail = ''
  for (let i = 0, len = item.length; i < len; i++) {
    for (let j = 0, len = source.length; j < len; j++) {
      if (item[i].languageId === source[j].id) {
        mail += source[j].name + '：标题-' + item[i].title + '，内容-' + item[i].content + '；'
      }
    }
  }
  return mail
}
