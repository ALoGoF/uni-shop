/*
 * @Author: chengen
 * @Date: 2024-04-10 17:23:42
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 17:52:55
 * @FilePath: /uni-shop/src/services/hot.ts
 */
import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
/**
 * @author: ce
 * @description: 获取好物推荐
 * @method getHotRecommendApi
 * @param {string} url
 * @param {PageParams} data
 * @return {*}
 */
export const getHotRecommendApi = (url: string, data?: PageParams & { subType?: string }) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
