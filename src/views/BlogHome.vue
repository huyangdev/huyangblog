<template>
  <div id="container">
    <main class="info">
      <div class="portralt"></div>

      <h1 class="mytitle">{{myInfo.author}}</h1>

      <div class="desc">{{myInfo.desc}}</div>

      <div class="info-but">
        <a href="https://github.com/BoyMi" target="_blank" class="github but-a">Github</a>
        <router-link to="/articles" class="blog but-a">我的博客</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      myInfo: {}
    }
  },
  mounted () {
    axios.get("/web-blog/static/home.json").then(response => {
      this.myInfo =  response.data;
    }).catch(response =>{

    });
  }
}
</script>

<style>
  #container{
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 0.9rem;
    width: 100%;
    height: 100vh;
    background: url(../assets/muntime-img2.jpg) no-repeat;
    background-size: cover;
  }
  #container .mytitle{
    margin-top: 3%;
    text-align: center;
    font-size: 18px;
    color:white;
  }
  .info{
    position: absolute;
    top:0px; left:0px; bottom: 0px; right: 0px;
    width:400px;
    margin: auto;
    height:40%;
  }
  .info .portralt{
    width:100px;
    height:100px;
    border-radius: 50%;
    background: url(../assets/logo.jpg) no-repeat;
    background-size: cover;
    margin: 0 auto;
  }
  .info .desc{
    text-align: center;
    margin-top: 3%;
    font-size: 16px;
    color:#fff;
  }
  .info .info-but{
    overflow: hidden;
    width:392px;
    text-align: center;
    margin: 5% auto;
  }
  .info .info-but .but-a{
    width: 140px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #00a3ee;
    background: #00a3ee;
    padding: 1%;
    border-radius: 5%;
    font-size: 14px;
    text-decoration: none;
    color: white;
  }
  .info .info-but .github{
    float: left;
    margin-left: 5%;
  }
  .info .info-but .blog{
    float: right;
    margin-right: 5%;
  }
</style>
