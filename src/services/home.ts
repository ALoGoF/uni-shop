/*
 * @Author: chengen
 * @Date: 2024-04-08 10:01:25
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 11:02:33
 * @FilePath: /uni-shop/src/services/home.ts
 */
import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import type { PageParams, PageResult } from '@/types/global'
//获取轮播图广告信息
/**
 * @author: ce
 * @description: getHomeBannerApi
 * @method:
 * @param {number} distributionSite
 * @return {*}
 */
export const getHomeBannerApi = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
//获取首页分类数据
export const getHomeCategoryApi = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

//获取首页热门推荐数据
export const getHomeHotApi = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
//获取猜你喜欢数据
export const getHomeGuessLikeApi = (data: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
