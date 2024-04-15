/*
 * @Author: chengen
 * @Date: 2024-04-07 13:18:10
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-10 11:14:43
 * @FilePath: /uni-shop/src/types/component.d.ts
 */
/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

//导出组件实例
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
