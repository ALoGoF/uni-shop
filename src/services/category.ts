/*
 * @Author: chengen
 * @Date: 2024-04-10 21:37:08
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 21:45:44
 * @FilePath: /uni-shop/src/services/category.ts
 */
import type { CategoryTopItem } from '@/types/categroy'
import { http } from '@/utils/http'

/**
 * @author: ce
 * @description: getTopCategoryApi
 * @method: 获取1级分类列表
 * @return {*}
 */
export const getTopCategoryApi = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
