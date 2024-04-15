/*
 * @Author: chengen
 * @Date: 2024-04-12 10:22:01
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-12 14:54:19
 * @FilePath: /uni-shop/src/services/profile.ts
 */
import type { LoginResult, ProfileDetail, ProfileParams } from '@/types/member'
import { http } from '@/utils/http'

/**
 * @author: ce
 * @description: 获取用户个人信息
 * @method: getProfileApi
 * @return {*}
 */
export const getProfileApi = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

export const putMemberProfileApi = (data: ProfileParams) => {
  return http<LoginResult>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
