<!--
 * @Author: chengen
 * @Date: 2023-08-30 12:16:16
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-08 11:31:00
 * @FilePath: /uni-shop/src/pages/index/components/CategoryPanel.vue
-->
<script setup lang="ts">
import type { CategoryItem } from '@/types/home'

// 定义 props 接收数据
defineProps<{
  list: CategoryItem[]
}>()
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in list"
      :key="item.id"
    >
      <image class="icon" :src="item.icon"></image>
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
@import '../styles/category.scss';
</style>
