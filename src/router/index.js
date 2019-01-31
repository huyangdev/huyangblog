import Vue from 'vue'
import VueRouter from 'vue-router'

import BlogArticleMain from '../views/BlogArticleMain.vue'
import BlogMessage from '../views/BlogMessage.vue'
import BlogLinks from '../views/BlogLinks.vue'
import BlogOpenSource from '../views/BlogOpenSource.vue'
import BlogAbout from '../views/BlogAbout.vue'
import BlogHome from '../views/BlogHome.vue'
import BlogArticle from '../views/BlogArticle.vue'

Vue.use(VueRouter);

export default new VueRouter({
  base: '/web-blog/',
  mode: 'history',
  // 配置路由
  routes: [
    {
      path: '/',
      component: BlogHome
    },
    {
      path: '/articles',
      component: BlogArticleMain
    },
    {
      path: '/message',
      component: BlogMessage
    },
    {
      path: '/links',
      component: BlogLinks
    },
    {
      path: '/bos',
      component: BlogOpenSource
    },
    {
      path: '/about',
      component: BlogAbout
    },
    {
      path: '/articles/:id',
      component: BlogArticle
    }
  ]
})
