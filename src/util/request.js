import axios from 'axios'
import { Message } from 'element-ui'

if (localStorage.getItem('areaId') !== 'undefined') {
  axios.defaults.headers.common['areaId'] = localStorage.getItem('areaId')
}

var service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = error.response.data.message + window.location.href
    } else {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 2 * 1000
      })
    }

    return Promise.reject(error)
  }
)

export default service
