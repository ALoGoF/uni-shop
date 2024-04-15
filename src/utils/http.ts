import { useMemberStore } from '@/stores'

/*
 * @Author: chengen
 * @Date: 2024-04-07 17:10:48
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-08 11:02:15
 * @FilePath: /uni-shop/src/utils/http.ts
 */
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpItnerceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) options.url = baseUrl + options.url
    options.timeout = 10000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const token = useMemberStore().profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpItnerceptor)
uni.addInterceptor('uploadFile', httpItnerceptor)

interface ResponseData<T> {
  code: string
  msg: string
  result: T
}

export function http<T>(options: UniApp.RequestOptions) {
  return new Promise<ResponseData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success: ({ data, statusCode }) => {
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data as ResponseData<T>)
        } else if (statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(data)
        } else {
          uni.showToast({
            icon: 'none',
            title: (data as ResponseData<T>).msg || '请求错误',
          })
          reject(data)
        }
      },
      fail: (error) => {
        uni.showToast({
          icon: 'none',
          message: '网络错误，换个网络试试',
        })
        reject(error)
      },
    })
  })
}
