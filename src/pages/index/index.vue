<!--
 * @Author: chengen
 * @Date: 2024-04-07 13:18:10
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 16:45:12
 * @FilePath: /uni-shop/src/pages/index/index.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/types/component'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerApi, getHomeCategoryApi, getHomeHotApi } from '@/services/home'
import PageSkeleton from './components/PageSkeleton.vue'
//获取首页轮播图数据
const bannerList = ref<BannerItem[]>([])
const getBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}
//获取首页分类数据
const categoryList = ref<CategoryItem[]>([])
const getCategoryData = async () => {
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}

//获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHotData = async () => {
  const res = await getHomeHotApi()
  hotList.value = res.result
}
//猜你喜欢
const guessRef = ref<XtxGuessInstance>()
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  guessRef.value?.resetData()

  await Promise.all([getBannerData(), getCategoryData(), getHotData(), guessRef.value?.getMore()])

  isTriggered.value = false
}

const loading = ref(false)
onLoad(async () => {
  loading.value = true
  await Promise.all([getBannerData(), getCategoryData(), getHotData()])
  loading.value = false
})
</script>

<template>
  <view class="viewport">
    <CustomNavbar />
    <scroll-view
      enable-back-to-top
      refresher-enabled
      scroll-y
      :refresher-triggered="isTriggered"
      @refresherrefresh="onRefresherrefresh"
      @scrolltolower="guessRef?.getMore"
      class="scroll-view"
    >
      <PageSkeleton v-if="loading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :list="categoryList" />
        <HotPanel :list="hotList" />
        <XtxGuess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f7;
}
//
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  .scroll-view {
    flex: 1;
    overflow: hidden;
  }
}
</style>
