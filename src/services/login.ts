/*
 * @Author: chengen
 * @Date: 2024-04-11 16:43:11
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-12 10:27:01
 * @FilePath: /uni-shop/src/services/login.ts
 */
import type { LoginParams } from '@/types/global'
import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

export const postLoginWxMinApi = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

export const postLoginWxMinSimpleApi = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
