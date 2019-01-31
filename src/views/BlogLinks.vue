<template>
<div class="blog-links-box">
  <div class="blog-links-header">
    <div class="bg"></div>
    <div class="blog-links-info">
      <h2>小船轻轻的飘</h2>
      <button @click="boarding">我要上船</button>
    </div>
  </div>
  <div class="blog-links-body">
    <a class="links-item" :href="item.homeLink" target="_blank" v-for="(item, index) in linksJson" :key="index">
      <div class="blog-links-item-title">{{item.name}}</div>
      <div class="blog-links-item-desc">
        {{item.desc}}
      </div>
    </a>

  </div>
  <div class="blog-links-footer"></div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      linksJson:[]
    }
  },
  mounted() {
    axios.get("/web-blog/static/links.json").then(response => {
      this.linksJson =  response.data.linksData;
    }).catch(response =>{

    });
  },
  methods:{
    boarding() {
      this.$alert(`
          <dl>
           <!--<dt>如何上船</dt>-->
           <dd>名称</dd>
           <dd>简单描述</dd>
           <dd>网站链接</dd>
           <dd>github链接/或其他[可选]</dd>
          </dl>

          <p>发送至: boy_hu@126.com | 完成后会以邮件回复!!</p>
          `, '如何上船', {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        callback:function(action, instance) {

        }
      });
    }
  }
}
</script>

<style>
  .blog-links-box{
    width: 1128px;
    margin: 0 auto;
  }
  .blog-links-box .blog-links-header{
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom:20px;
    background: rgba(0,0,0,.3);
  }
  .blog-links-box .blog-links-header .bg{
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 200px;
    background-image: url("../assets/friend.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-filter: blur(6px);
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    -ms-filter: blur(6px);
    filter: blur(6px);

  }

  .blog-links-box .blog-links-info {
    position: absolute;
    top: 70px;
    width: 100%;
    color:#fff;
    text-align: center;
  }

  .blog-links-box .blog-links-info h2 {
    font-size: 26px;
  }
  .blog-links-box .blog-links-info > button{
    border: none;
    margin-top: 10px;
    padding: 6px;
    color: #fff;
    background: #409eff;
  }
  .blog-links-box .blog-links-info > button:hover{
    background: #409eff;
    color: #fff;
    cursor: pointer;
  }

  .el-message-box__wrapper .el-message-box {
    width: 267px;
  }
  .el-message-box__wrapper .el-message-box__message{
    font-size: 14px !important;
  }
    /* 头部 E  */



  .blog-links-box .blog-links-body{
    width: 1128px;
    overflow: hidden;
    margin: 0 auto;
  }

  .blog-links-box .blog-links-body .links-item{
    float: left;
    width: 230px;
    height: 100px;
    margin-right: 20px;
    margin-top:20px;
    border-radius:3px;
    background: #FFF;
    transition:.6s;
    padding: 6px;
  }
  .blog-links-box .blog-links-body .links-item:hover{
    box-shadow:0px 10px 10px #ccc;
    transform:translateY(-6px);
  }
  .blog-links-item-title {
    font-size: 18px;
    color: #000;
    border-left: 4px solid #409eff;
    padding-left: 10px;
  }

  .blog-links-item-desc {
    width: 100%;
    height: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top:12px;
    font-size: 14px;
    color: #8c8c8c;
  }
</style>
