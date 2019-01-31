<template>
  <div class="blog-header-box">
    <router-link class="left" to="/"></router-link>
    <div class="right">
      <el-menu text-color="#000" active-text-color="#409EFF"
               class="el-menu-demo menu-list" mode="horizontal">
        <el-menu-item index="1"><router-link to="/articles">文章</router-link></el-menu-item>
        <!--<el-menu-item index="2"><router-link to="/bos">轮子</router-link></el-menu-item>-->
        <el-menu-item index="3"><router-link to="/articles/3">关于</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/message">留言</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/links">友链</router-link></el-menu-item>
      </el-menu>
      <div>
        <el-row class="block-col-2">
          <el-col :span="12">
            <span class="demonstration"></span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-more blog-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><router-link to="/articles">文章</router-link></el-dropdown-item>
                <!--<el-dropdown-item><router-link to="/bos">轮子</router-link></el-dropdown-item>-->
                <el-dropdown-item><router-link to="/articles/3">关于</router-link></el-dropdown-item>
                <el-dropdown-item><router-link to="/message">留言</router-link></el-dropdown-item>
                <el-dropdown-item><router-link to="/links">友链</router-link></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
  export default {}
</script>

<style>
  .blog-header .blog-header-box {
    position: relative;
    width: 70.5rem;
    height: 60px;
    margin: 0 auto;
  }

  .blog-header .left {
    float: left;
    width: 100px;
    height: 60px;
    background-image: url('../assets/logo.png');
    background-size: 60px 60px;
    background-repeat: no-repeat;
  }

  .el-menu-item{
    padding: 0px 0px;
  }


  .blog-header .right {
    float: right;
    min-width:380px;
  }

  .blog-header .right a{
    display: block;
    height:60px;
    padding:0 20px;

  }
  .blog-header .menu-list {
    border-bottom: none;
  }

  .blog-header .el-menu-item{
    padding: 0px 0px !important;
  }

  .blog-header .el-menu-item:hover {
    color: #409EFF !important;
  }

  .blog-header .blog-more {
    display: none;
  }


</style>
