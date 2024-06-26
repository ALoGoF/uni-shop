// /src/pages/hot/hot.vue
<script setup lang="ts">
import { getHotRecommendApi } from '@/services/hot'
import { onLoad } from '@dcloudio/uni-app'
import type { SubTypeItem, HotResult } from '@/types/hot'
import { ref } from 'vue'
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

const query = defineProps<{
  type: string
}>()

const currentHotMap = hotMap.find((item) => item.type === query.type)

uni.setNavigationBarTitle({ title: currentHotMap!.title })

const activeId = ref('')
const bannerPicture = ref('')
const subTypes = ref<(SubTypeItem & { finished?: boolean })[]>([])
const getHotRecommendData = async () => {
  const res = await getHotRecommendApi(currentHotMap!.url, {
    page: 1,
    pageSize: 10,
  })
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes

  if (res.result?.subTypes?.length) {
    activeId.value = res.result?.subTypes[0]?.id
  }
}
const handleTypeTap = (id: string) => {
  activeId.value = id
}

const handleGetMore = async () => {
  const currentSubType = subTypes.value.find((item) => item.id === activeId.value)!
  if (currentSubType.goodsItems!.page < currentSubType.goodsItems!.pages) {
    currentSubType.goodsItems!.page++
  } else {
    currentSubType.finished = true
  }
  const res = await getHotRecommendApi(currentHotMap!.url, {
    subType: currentSubType.id,
    page: currentSubType.goodsItems?.page,
    pageSize: currentSubType.goodsItems?.pageSize,
  })
  const newSubTypes = res.result.subTypes.find((item) => item.id === activeId.value)!
  currentSubType.goodsItems?.items.push(...newSubTypes.goodsItems!.items)
}

onLoad(() => {
  getHotRecommendData()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="item in subTypes"
        @tap="handleTypeTap(item.id)"
        class="text"
        :class="{ active: item.id === activeId }"
        :key="item.id"
        >{{ item.title }}
      </text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      v-for="item in subTypes"
      :key="item.id"
      v-show="activeId === item.id"
      scroll-y
      @scrolltolower="handleGetMore"
      class="scroll-view"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems?.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.desc }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finished ? '没有更多数据了' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
  overflow: hidden;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
  overflow: hidden;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
    white-space: nowrap;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
