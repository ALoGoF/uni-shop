/*
 * @Author: chengen
 * @Date: 2024-04-07 13:18:10
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-12 10:28:48
 * @FilePath: /uni-shop/src/stores/modules/member.ts
 */
import type { LoginResult } from '@/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<LoginResult>()

    // 保存会员信息，登录时使用
    const setProfile = (val: LoginResult) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // persist: true,
    persist: {
      storage: {
        getItem: (key) => {
          return uni.getStorageSync('key')(key)
        },
        setItem: (key, value) => {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
