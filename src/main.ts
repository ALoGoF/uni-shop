/*
 * @Author: chengen
 * @Date: 2024-04-07 13:18:10
 * @LastEditors: chengen
 * @LastEditTime: 2024-04-07 17:27:49
 * @FilePath: /uni-shop/src/main.ts
 */
import { createSSRApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import './utils/http'
export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  return {
    app,
  }
}
