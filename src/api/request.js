// 对axios进行二次封装
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:5555',
  timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以执行一些逻辑
    // 比如添加请求头、验证等
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { authorization } = response.headers
    localStorage.setItem('token', authorization)
    if (response.data.code === 200) {
      return response?.data?.data
    } else if (response.data.code === 400) {
      Promise.reject(response)
    } else {
      Promise.reject(response)
    }
    // return response
  },
  (error) => {
    const {status} = error.response
    if(status === 401){
      localStorage.removeItem('token')
      window.location.href = '#/login'
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
)

export default http
