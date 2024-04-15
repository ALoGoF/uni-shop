/*
 * @Author: chengen
 * @Date: 2024-04-10 22:19:58
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 22:22:07
 * @FilePath: /uni-shop/src/services/goods.ts
 */
import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

export const getGoodsDetail = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: { id },
  })
}
