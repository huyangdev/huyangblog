<template>
  <div>
    <div class="blog-header">
        <BlogHeader/>
    </div>
    <div class="blog-main">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <BlogFooter/>
  </div>
</template>

<script>

import BlogHeader from './components/BlogHeader.vue'
import BlogArticleMain from './views/BlogArticleMain.vue'
import BlogFooter from './components/BlogFooter.vue'

export default {
  components: {
    BlogHeader,
    BlogArticleMain,
    BlogFooter
  },
  methods: {

  }
}
</script>

<style>
  .blog-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
  }

  .blog-main{
    width: 100%;
    /*height: 700px;*/
    min-height: 100vh;
    overflow: hidden;
    margin: 20px auto 20px;
  }



  /* -------- move ------ */
  .move-enter-active{
    transition: all 0.3s ease;
  }
  .move-leave-active{
    transition: all 0.8s    ;
  }
  /* 类似向左滑动的感觉 */
  .move-leave-to { /* 移出时 向左移动 */
    transform: translateX(-10px);
    opacity: 0;
  }
  .move-enter{ /* 进入时也向左移动 */
    transform: translateX(10px);
    opacity: 0;
  }




</style>
