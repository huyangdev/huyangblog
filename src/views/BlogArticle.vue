<template>
  <div class="article-detail">
    <div class="article-detail-center">
      <div class="article-detail-header"></div>
      <div class="article-title">
        <h1>
          {{article.title}}
          <div class="title-info">
            <span>
              <el-tag>{{article.author}}</el-tag><el-tag>{{article.type}}</el-tag>
            </span>
          </div>
        </h1>
      </div>
      <div class="article-detail-content">
        <div class="editormd-preview" >
          <div class="markdown-body editormd-preview-container" previewcontainer="true" v-html="article.contentHtml"></div>
        </div>
      </div>
      <div class="article-detail-footer">
        发表时间：{{formatDate(article.createDate)}}
        &nbsp;&nbsp;
        预览：{{article.articleInfo.browse}}
      </div>
    </div>
    <div class="article-loadingbox" v-if="locaing"><i class="el-icon-loading"></i></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      article: {
        id:'',
        title:'',
        articleInfo: {
          id:'',
          articleId: '',
          browse: 0,
          like: 0,
        },
        type: '',
        tags: '',
        pathImg: '',
        createDate: null,
        contentHtml: '',
        contentMd: '',
        author: '',
        articleType: '',
        articleDesc: ''
      },
      locaing: true
    }
  },
  methods: {
    formatDate(date,split='-') {
      let createDate = new Date(date);
      const year = createDate.getFullYear(); // 年
      const month = (createDate.getMonth()*1)+1; //月
      const day = createDate.getDate(); //日
      return year+split+month+split+day;
    }
  },
  mounted () {
    let id = this.$route.params.id;
    if((id+"").match(/^\d{1,6}$/)) {
      axios.get(this.$store.state.articleUrl+id).then(response => {
        this.article = response.data;
        this.locaing = false;
      }).catch(response => {

      });

      // axios.get('http://localhost:8777/article/b-count/'+id).then(response => {}).catch(response => {});


    }
  }
}
</script>

<style>
  .article-loadingbox{
    text-align: center;
    font-size: 30px;
  }

  .article-detail-center{
    position: relative;
    width: 1128px;
    height: 100%;
    margin: 0 auto;
    background: #fff;
  }
  /* 头部 S */
  .article-detail-header{
    width: 100%;
    height: 200px;
    background-image: url("../assets/article-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-filter: blur(6px);
    -moz-filter: blur(6px);
    -o-filter: blur(6px);
    -ms-filter: blur(6px);
    filter: blur(6px);
    margin-bottom:20px;
  }

  .article-detail-center > .article-title{
    position: absolute;
    width: 100%;
    height: 200px;
    top:0px;
    left: 0px;
    background: rgba(0,0,0,.5);
    color: #fff;
  }
  .article-title .title-info{
    margin-top: 10px;
  }

  .article-title .title-info .el-tag{
    background:#409EFF;
    color: #fff;
    height: 24px;
    line-height: 24px;
  }
  .article-title .title-info .el-tag:first-child{
    background:#949494;
  }
  .article-detail-center > .article-title h1{
    width: 100%;
    margin-top: 60px;
    text-align: center;
    display: block;
    font-size: 20px;
  }
  /* 头部 E */

  /* 文章内容 S */
  .article-detail-center .editormd-preview{
    position: initial;
    display: block;
    width: 100%;
    margin:0 auto;
  }

  .article-detail-center .editormd-preview-container, .editormd-html-preview{
    width: 95%;
    padding: 10px;
    margin: 0 auto;
  }
  .article-detail-center .markdown-body img{
    display: table-cell;
    margin: auto;
  }
  .article-detail-center .markdown-body .prettyprint .linenums{
    min-width: 800px;
  }
  /* 文章内容 E */

  /* 文章底部 start */
    .article-detail-footer{
      padding: 10px;
    }
  /* 文章底部 end */

</style>
