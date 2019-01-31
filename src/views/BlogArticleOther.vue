<template>
<div class="right-model">
    <!-- 近期文章    S  -->
    <div class="recent box-sdown">
      <h5 class="recent-title title">热门文章</h5>
      <ul class="recent-ul">
        <li v-for="(article) in hotArticle" :key="article.id"><router-link :to="hotUrl+article.id">{{article.title}}</router-link></li>
      </ul>
    </div>
    <!-- 近期文章    E  -->

    <!-- 音乐    S  -->
    <div class="music box-sdown">
      <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="100%" src="http://music.163.com/outchain/player?type=0&id=2146709262&auto=0&height=430"></iframe>
    </div>
    <!-- 音乐    E  -->

    <!-- 标签    S  -->
    <div class="my-labels box-sdown">
      <h5 class="my-labels-title title">分类</h5>
      <div class="lab">
        <el-tag :type="bgColor[getRandom(0,5)]" v-for="(item,index) in articleType" :key="index">
          {{item.name}}
          <span style="font-size: 14px;">({{item.count}})</span>
        </el-tag>
      </div>
    </div>
    <!-- 标签    E  -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hotArticle:[],
      articleType: [
        {
          id: 0,
          name: '',
          count: 0
        }
      ],
      bgColor: ['','success','info','warning','danger'],
      hotUrl:'./articles/'
    }
  },
  mounted () {
    axios.get(this.$store.state.articleHotUrl).then(response => {
      this.hotArticle = response.data;
    }).catch(response => {

    });

    axios.get(this.$store.state.articleType).then(response => {
      this.articleType = response.data;
    }).catch(response => {

    })
  },
  methods: {
    getRandom(to,from) {
      return parseInt(Math.random()*(from - to)) + to;
    }
  }

}
</script>

<style>
  /* 右侧 模块 */
  .right-model {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    /*padding: 0% 1% 1%;*/
  }

   .right-model .title {
    text-align: center;
    font-size: 1rem;
    padding-top: 2%;
    padding-bottom: 2%;
    border-bottom: 1px solid #eee;
  }

   /*.right-model .box-sdown {*/
    /*box-shadow: 1px 3px 6px #ccc;*/
  /*}*/

  /* 近期文章   S */
   .right-model .recent {
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
  }

   .recent .recent-title {

  }

   .recent .recent-ul {
    list-style: none;
    font-size: 0.6rem;
  }

   .recent-ul li {
    position:relative;
    overflow: hidden;
    /*定义一个 计数器变量*/
    counter-increment: a;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:36px;
    padding: 1%;
    line-height:36px;
    margin-left: 3%;
  }
   .recent-ul li::before {
    position: absolute;
    width: 26px;
    height: 26px;
    font-size:14px;
    line-height: 26px;
    text-align: center;
    content: counter(a,decimal);
    left: 0;
    top:9px;
    border-radius: 100%;
    background-color: #efefee;
    text-shadow: 0 1px 0 hsla(0,0%,100%,.5);
  }
   .recent-ul li:first-of-type::before, .recent-ul li:nth-of-type(2)::before, .recent-ul li:nth-of-type(3)::before{
    color: #fff;
  }
   .recent-ul li:first-of-type::before{
    background-color: #f56c6c;
  }
   .recent-ul li:nth-of-type(2)::before{
    background-color: #0366d6;
  }
   .recent-ul li:nth-of-type(3)::before{
    background-color: #6bc30d;
  }

   .recent-ul li a {
    margin-left:30px;
    text-decoration: none;
    font-size: 14px;
    color: #000;
  }

   .recent-ul li a:hover {
    color: #3385ff;
  }
  /* 近期文章   E */

  /* 标签   S */
   .right-model .my-labels {
    overflow: hidden;
    width: 100%;
    background: #fff;
  }
   .lab .el-tag{
     margin: 6px;
   }


   .my-labels .lab a {
    float: left;
    font-size: 0.77rem;
    text-decoration: none;
    color: #9c9d9b;
    padding: 0.8% 1.6%;
    margin: 1%;
  }

   .my-labels .lab a:hover {
    color: #0366d6;
    text-decoration: underline;
  }

  /* 标签  E */
   .right-model .music {
    height: 430px;
    background: #fff;
    margin-bottom: 3%;
  }
  /* main  E  */
</style>
