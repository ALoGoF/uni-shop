/*
 * @Author: chengen
 * @Date: 2024-04-12 16:50:35
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-15 15:03:57
 * @FilePath: /uni-shop/src/services/address.ts
 */
import { http } from '@/utils/http'
import type { AddressItem, AddressParams } from '@/types/address'
/**
 * @author: ce
 * @description: 获取收货地址列表
 * @method: getMemberAddressApi
 * @return {*}
 */
export const getMemberAddressApi = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

/**
 * @author: ce
 * @description: 根据ID获取地址
 * @method: getMemberAddressByIdApi
 * @param {string} id
 * @return {*}
 */
export const getMemberAddressByIdApi = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/**
 * @author: ce
 * @description: 新建地址
 * @method: postMemberAddressApi
 * @return {*}
 */
export const postMemberAddressApi = (data: AddressParams) => {
  return http<{ id: string }>({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

export const putMemberAddressApi = (data: AddressParams, id: string) => {
  return http<{ id: string }>({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
