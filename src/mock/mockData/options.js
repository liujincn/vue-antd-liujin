import Mock from 'mockjs'
const Random = Mock.Random
const server = []
const channel = []
const goods = [
  { id: "10001", name: "以旧换新" },
  { id: "10002", name: "狂暴收割" },
  { id: "10003", name: "引力毒雾" },
  { id: "10004", name: "亡者邀请" },
  { id: "10005", name: "芭比闪耀" },
  { id: "10006", name: "命脉两失" },
  { id: "10007", name: "湮灭挥砍" }
]
const language = [
  { id: 1, name: "中文" },
  { id: 2, name: "英文" },
  { id: 3, name: "繁体" },
  { id: 4, name: "印尼语" },
  { id: 5, name: "菲律宾" },
  { id: 6, name: "越南" },
  { id: 7, name: "泰语" },
  { id: 8, name: "葡萄牙语" },
  { id: 9, name: "韩语" },
  { id: 10, name: "法语" },
  { id: 11, name: "德语" },
  { id: 12, name: "马来语" }
]
const system = [
  { id: 1, name: '苹果' },
  { id: 2, name: '安卓' }
]

for (let i = 0; i < 10; i++) {
  let template = {
    'id': Random.natural(4),
    'name': Random.ctitle(4)
  }
  server.push(template)
}

for (let i = 0; i < 4; i++) {
  let template = {
    'id': Random.natural(4),
    'name': Random.ctitle(4)
  }
  channel.push(template)
}

export { server, channel, system, goods, language }
