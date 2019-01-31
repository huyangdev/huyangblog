<template>
  <section class="article-item">
    <div class="article-item-head gnanral">
      <h3 class="article-item-head__title">
        <router-link :to="`/articles/${article.id}`" class="">{{article.title}}</router-link>
      </h3>
      <div class="article-item-head__info">
        <span>作者:  {{article.author}}</span>
        <span>栏目：<a href="" class="article-type">{{article.type}}</a></span>
      </div>

      <time class="article-item-head__time"><span class="day">{{new Date(article.createDate).getDate()}}</span> <span class="month">{{new Date(article.createDate).getMonth()+1}}</span> <span
        class="year">{{new Date(article.createDate).getFullYear()}}</span>
      </time>
    </div>
    <div class="article-item-body gnanral">
      <div class="article-item-body-img">
        <router-link :to="`/articles/${article.id}`" v-if="article.pathImg" class="">
          <img width="150" height="130" :src="article.pathImg" :alt='article.title' class="mo-image-loaded">
        </router-link>
      </div>
      <div class="article-item-body-content mo-clearfix">
        {{article.articleDesc}}
      </div>
    </div>

    <div class="article-item-foot gnanral">
      <div class="article-tags">
        <i class="el-icon-edit-outline"></i>
        <a v-for="(val,index) in article.tags.split(',')" :key="index" href="#" class="post-tag">
          {{val}}
        </a>
      </div>
      <div class="article-browse-count">
        <span class="article-count">
          <i class="el-icon-view"></i>：{{article.articleInfo.browse}}
          <i v-if="0" class="iconfont">&#xe69b;：0</i>
        </span>
        <!--<span class="article-count">-->
          <!--<i class="mo-icon-comment"></i>-->
        <!--</span>-->
      </div>
    </div>
  </section>
</template>

<script>


  export default {
    props: {
      article:Object
    },
    data () {
      return {}
    },
    components: {

    }

  }
</script>

<style>
  .article-item {
    /*height: 400px;*/
    background-color: #fff;
    border-bottom: 1px solid #dededd;
  }

  .article-item .gnanral {
    padding: 10px;
    font-size: 1rem;
  }

  /* 头部 S */
  .article-item .article-item-head {
    position: relative;
  }

  .article-item .article-item-head::after {
    content: '';
    display: block;
    width: 98%;
    height: 1px;
    margin: 0 auto;
    border-top: 1px solid #f2f2f1;
  }

  .article-item .article-item-head__title {
  }

  .article-item .article-type {
    color: #0366d6;
  }

  .article-item .article-item-head__time {
    position: absolute;
    right: 20px;
    top: 16px;
    color: #b6b6b5;
    width: 48px;
    font-size: 14px;
    text-align: center;
    user-select: none;
  }

  .article-item .article-item-head__time > .day {
    position: absolute;
    top: 0px;
    left: -42px;
    font-size: 36px;
    color: #409EFF;
  }

  .article-item-head__title a {
    font-size: 1.5rem;
    color: #333;
  }

  .article-item .article-item-head__info {
    padding: 3px;
    color: #9c9d9b;
  }

  .article-item .article-item-head__info a:hover {
    text-decoration: underline;
  }

  /* 头部 E */

  /* 内容 S */
  .article-item-body {
    /*border: 1px solid #000;*/
    overflow: hidden;
  }

  .article-item .article-item-body-img {
    float: left;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 0;
  }

   .article-item-body-content {
    /*height: 100%;*/
    font-size: 15px;
    line-height: 28px;
  }
  /* 内容 E */

  /* 底部 S */
  .article-item .article-item-foot {
    height: 30px;
    color:#aaa;
  }
  .article-item .article-tags{
    float: left;
  }

  .article-item .article-tags .post-tag {
    color: #aaa;
  }
  .article-item .post-tag:hover{
    text-decoration: underline;
  }
  .article-item .article-browse-count{
    float: right;
  }


  /* 底部 E */
</style>
