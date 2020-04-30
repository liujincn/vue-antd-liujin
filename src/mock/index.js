import Mock from 'mockjs'
import { server, channel, system, goods, language } from '@/mock/mockData/options'
//使用mockjs模拟数据
Mock.mock('/api/server', () => {
  return {
    server
  }
})
Mock.mock('/api/channel', () => {
  return {
    channel
  }
})
Mock.mock('/api/system', () => {
  return {
    system
  }
})
Mock.mock('/api/goods', () => {
  return {
    goods
  }
})
Mock.mock('/api/language', () => {
  return {
    language
  }
})
Mock.setup({
  timeout: 800
});
