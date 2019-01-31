<template>
<div class="blog-article-box">
  <div class="blog-other">
    <BlogArticleOther/>
  </div>
  <div class="article-items">
    <div class="blog-article-search header-fixed">
      <input class="search-in" type="text" maxlength="50" placeholder="搜索.." v-model="keywords">
      <span class="search-but">
            <i v-if="!keywords" class="iconfont">&#xe6ac;</i>
            <i v-else @click="keywords = ''" class="iconfont">&#xe612;</i>
      </span>
      <div class="blog-article-search-result" v-show="keywords">
        <ul>
          <li v-for="(article,index) in searchArticle">
            &nbsp;
            <router-link :to="`/articles/${article.id}`">{{article.title}}</router-link>
            <span style="float: right;margin-right: 10px;">作者: {{article.author}}</span>
          </li>
        </ul>
      </div>
    </div>  <!-- // $store.state.articles -->
    <BlogArticles v-for="(article,index) in $store.state.articles" :article="article" :key="article.id"/>
    <div class="article-loadingbox" v-if="locaing"><i class="el-icon-loading"></i></div>
    <div v-if="flag" class="load-art" @click="showPageArt">点击加载</div>
  </div>
</div>
</template>

<script>

import BlogArticles from './BlogArticles.vue'
import BlogArticleOther from './BlogArticleOther.vue'
import axios from 'axios'
import scroll from '../utils/scroll.js'

export default {
    data() {
        return {
          pageNo:1,
          flag:true,
          locaing: true,
          keywords:'',
          searchArticle:[],
          timer:null
        }
    },
  components: {
    BlogArticles,
    BlogArticleOther
  },
  mounted () {
    this.$store.state.articles= [];
    this.showPageArt();
    window.addEventListener('scroll',this.myScroll,true);
  },
  watch:{
    keywords(){
      axios.get(this.$store.state.articleSearch+'?k='+this.keywords).then(response => {
        this.searchArticle = response.data;
      }).catch(response => {

      })
    }
  },
  methods: {
    getDate() {},
    showPageArt() {
        this.locaing = true;
        axios.get(this.$store.state.articleListUrl+this.pageNo).then(response => {
          let pageInfo = response.data
          for(let article of pageInfo.list){
            this.$store.state.articles.push(article);
          }
          if(!pageInfo.isHasNext){
            this.flag = false;
          }
          this.locaing = false;
          this.pageNo++;
        }).catch(response => {

        })
      },

    myScroll() {
      scroll.pageScroll((scrollTop,scrollHeight,clientHeight) => {
        if(scrollTop > (scrollHeight*0.2)) {

        }

      });
    }
  }
}
</script>

<style>
  .blog-main .blog-article-box{
    width: 1128px;
    /*background:pink;*/
    height:100%;
    overflow: hidden;
    margin: 0 auto;
  }
  /* 搜索框 S */
  .blog-main .blog-article-box .blog-article-search {
    position: relative;
    width: 100%;
    height:40px;
    padding: 5px 0px;
    background:#409EFF;
    line-height:40px;
    text-align: center;
  }
  .blog-main .blog-article-box .blog-article-search .search-in{
    outline: none;
  }

  .blog-main .blog-article-search .blog-article-search-result{
    position: absolute;
    top:50px;
    left: 0px;
    width: 99.7%;
    margin:auto;
    max-height: 300px;
    background: #fff;
    z-index: 100;
    border-left:1px solid #409EFF;
    border-bottom:1px solid #409EFF;
    overflow-y: scroll;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 3px;
    text-align: left;
  }

  .blog-main .blog-article-search .blog-article-search-result a{
    color: #000;
  }
  .blog-main .blog-article-search .blog-article-search-result a:hover{
    text-decoration: underline;
  }

  .blog-main .blog-article-search-result::-webkit-scrollbar {
    width: 0.5%;
  }

  .blog-main .blog-article-search-result::-webkit-scrollbar-thumb{
    background-color: #0ae;
  }

  .article-loadingbox{
    text-align: center;
    font-size: 30px;
  }
  .blog-main .blog-article-search > input {
    border: none;
    width: 80%;
    padding: 6px;
    border-radius:18px;
    font-size: 12px;
  }
  .blog-main .blog-article-search .search-but {
    position: absolute;
    right: 11%;
    cursor:pointer;
  }
  .blog-main .blog-article-search .search-but > i{}
  /* 搜索框  E */

  .blog-article-box .article-items{
    float: left;
    width:49rem;
    height: 100%;
  }

  .blog-article-box .blog-other{
    float: right;
    width:20rem;
    overflow: hidden;
    /*background-color: #5bc0de;*/
  }

  /* 加载 */
  .load-art{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    background: #409eff;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
    cursor:pointer;
  }
</style>
