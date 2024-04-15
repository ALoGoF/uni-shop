/*
 * @Author: chengen
 * @Date: 2024-04-11 17:24:45
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-11 17:26:36
 * @FilePath: /uni-shop/src/hooks/useGuessList.ts
 */
import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'
export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()
  const onScrolltoLower = () => {
    guessRef.value?.getMore()
  }
  return {
    guessRef,
    onScrolltoLower,
  }
}
