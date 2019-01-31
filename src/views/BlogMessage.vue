<template>
  <div class="blog-massage-page">
    <div class="message-info-box" :class="messageClass">
      <ul>
        <li>blog<i class="el-icon-close close" @click="messageInfo(false)"></i></li>
        <li><input maxlength="10" type="text" placeholder="您的名称 | 仅限十位" v-model="addMessage.author" /></li>
        <li><input type="email" placeholder="邮箱..可选" /></li>
        <li><input type="text" placeholder="网站..可选" /></li>
        <li class="enter-but">
          <button style="border-right:2px solid #ccc; color: #409eff;" @click="messageInfo(false)">确认</button><button @click="messageInfo(false)">取消</button>
        </li>
      </ul>

    </div>
    <div class="blog-massage-box">
      <!--<div class="article-detail-header"></div>-->
      <div class="blog-massage-iuput">
        <div class="poto-author">
          <div class="poto" @click="messageInfo(true)"></div>
          <div class="author">戳一戳</div>
        </div>
        <div class="m-input">
          <el-input type="textarea" :rows="2" placeholder="留下你想说的吧...." v-model="addMessage.content"></el-input>
          <div class="submit-mesasge">
            <el-button type="primary" @click="messageSub">提交</el-button>
          </div>
        </div>
      </div>
      <div  class="blog-massage-content">
        <ul v-if="messages.length>0">
          <li v-for="(val,mindex) in messages" :key="mindex">
            <div class="m-content">
              <div class="nickname">
                &nbsp;&nbsp;{{val.author}}
                <span class="time">&nbsp;{{new Date(val.time).toLocaleString()}}</span>
                <span @click="showReply($event,val.id,mindex)" style="font-size:14px; color:#409eff; cursor: pointer;">回复</span>
                &nbsp;&nbsp;
                <span @click="showMoreReply($event,mindex)"
                      v-if="val.messageReplyList.length > 1" style="font-size:14px; color:#409eff; cursor: pointer;">展开回复</span>
                &nbsp;&nbsp;
                <span @click="clearMessage(val.id,mindex)" v-if="clearMessageFlag" style="font-size:14px; color:red; cursor: pointer;">删除</span>
              </div>
              <div class="content">{{val.content}}</div>
            </div>
            <div class="m-content-reply-box">
              <!-- 回复 S  -->
              <div class="m-content-reply" v-for="(reply,rindex) in val.messageReplyList" :key="rindex">
                <div class="item-reply">
                  <div><span style="font-size: 20px; color: #000;">{{reply.author}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                    <span style="font-size: 14px;">{{new Date(reply.time).toLocaleString()}}</span>
                    <span @click="clearReply(reply.id,mindex,rindex)" v-if="clearReplyFlag" style="font-size:14px; color:red; cursor: pointer;">删除</span>
                  </div>
                  <br/>
                  <div>{{reply.content}}</div>
                </div>
              </div>
              <!-- 回复 E -->
            </div>
            <div class="comments-form__body" v-if="replyFlagArr[mindex]">
              <el-input maxLength="10" placeholder="您的名称 | 仅限十位" v-model="addReply.author"></el-input>
              <div class="comments-form__edit">
                <el-input type="textarea" :rows="2" placeholder="说点啥.." v-model="addReply.content">
                </el-input>
              </div>
              <div class="mo-left">
                  <el-button type="primary" @click="replySub">提交</el-button>
              </div>
            </div>

          </li>
        </ul>
        <div v-else>还没有相关评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import handlerClass from '../utils/ElClassUtil.js'
import scroll from '../utils/scroll.js'
export default {
  data() {
    return {
      messages: [
        {
          author: '',
          content: '',
          time: null,
          messageReplyList:[
            {
              author:'',
              content: '',
              id:0,
              messageId:-1,
              time:null
            }
          ]
        }
      ],
      messageClass:'',
      closeReply:'回复',
      pageNo: 1,
      page:{},
      addMessage:{
        author:'',
        content:''
      },
      addReply:{
        messageId: 0,
        author:'',
        content:''
      },
      nowReply:-1,
      replyFlagArr:[],
      clearMessageFlag: false,
      clearReplyFlag: false
    }
  },
  mounted(){
    this.pageSelect();

    axios.get(this.$store.state.isLogin).then(response => {
      if(response.data.isLogin){
        this.clearMessageFlag = true;
        this.clearReplyFlag = true;
      }
    }).catch(response => {this.alertInfo('出了点小问题!!!','error');});
    window.addEventListener('scroll',this.myScroll,true);
    this.messages = [];
  },
  computed: {
    replyFlag() {
      return this.setterReplyArr();
    }
  },
  methods: {
    pageSelect(){
      axios.get(this.$store.state.messageUrl+this.pageNo).then(response => {
        this.page = response.data;
        let messageList = this.page.list;
        for(let i=0; i<messageList.length; i++) {
          this.messages.push(messageList[i])
        }
      }).catch(response => {this.alertInfo('出了点小问题!!!','error');});
    },
    myScroll() {
      if(!this.page.isHasNext) {
         return;
      }
      scroll.pageScroll((scrollTop,scrollHeight,clientHeight) => {
        if(scrollTop > (scrollHeight*0.5)){
          this.pageNo++;
          this.pageSelect();
        }
      });
    },
    messageInfo(flag){
      if(flag){
        this.messageClass = "in-message-info-box";
      } else{
        this.messageClass = "";
      }
    },
    // 留言提交
    messageSub(){
      if(!this.addMessage.author || !this.addMessage.content) {
        this.messageInfo(true);
        return false;
      }
      if(this.addMessage.author.length > 10){
        this.alertInfo('名称最大十位','warning');
        return false;
      }

       axios.post(this.$store.state.addMessageUrl,this.addMessage).then(response => {
         if(response.data == 1){
           this.addMessage.time = new Date();
           let o = {
             author:this.addMessage.author,
             content: this.addMessage.content,
             time: this.addMessage.time,
             messageReplyList: []
           };
           this.messages.push(o);
           this.addMessage.content = '';
           this.alertInfo('添加成功','success');
         }
       }).catch(response => {
         this.alertInfo('添加留言错误....','error');
       })
    },
    // 回复提交
    replySub(){
      if(!this.addReply.messageId){
        this.alertInfo('留言标识获取失败','error');
        return false;
      }

      if(!this.addReply.author || !this.addReply.content) {
        this.alertInfo('参数,参数,参数~~~','warning');
        return false;
      }

      if(this.addReply.author.length > 10){
        this.alertInfo('名称最大十位','warning');
        return false;
      }

      axios.post(this.$store.state.addReplyUrl,this.addReply).then(response => {
        if(response.data == 1){
          this.addReply.time = new Date();
          let o = {
            author:this.addReply.author,
            content: this.addReply.content,
            time: this.addReply.time
          };
          this.messages[this.nowReply].messageReplyList.push(o);
          this.alertInfo('回复完成','success');
          this.addReply= {}
        }
      }).catch(response => {
        this.alertInfo('回复出了点问题','error');
      });
    },
    // 提示消息
    alertInfo(msg,type){
      this.$message({
        message: msg,
        type: type
      });
    },
    // 设置回复数组
    setterReplyArr(){
      for(let i=0; i< this.messages.length; i++) {
        this.replyFlagArr.splice(i,1,false);
      }
      return this.replyFlagArr;
    },
    showReply(event,messageId , index){
      this.nowReply = index;
      let flag = this.replyFlagArr[index];
      this.addReply.messageId = messageId;
      if(flag) {
        this.replyFlagArr.splice(index,1,false);
        event.target.innerHTML = '回复';
        this.addReply.author = '';
        this.addReply.content = '';
      }else {
        this.setterReplyArr();
        this.replyFlagArr.splice(index,1,true);
        event.target.innerHTML = '取消回复';
      }
    },
    // 显示更多回复
    showMoreReply(event,index) {
      let oReplyBoxs = document.querySelectorAll(".m-content-reply-box");
      // let target = event.currentTarget;
      // let target = event.currentTarget;

      if(handlerClass.hasClass(oReplyBoxs[index],'reply-box-show')){
        handlerClass.removeClass(oReplyBoxs[index],"reply-box-show");
        event.target.innerHTML = '展开回复';
      }else{
        handlerClass.addClass(oReplyBoxs[index],"reply-box-show");
        event.target.innerHTML = '收起回复';
      }

    },
    // 删除留言
    clearMessage(id,index){
      if(!window.confirm("确定要删除吗?")){
         return false;
      }

      axios.post(this.$store.state.clearMessageUrl+id).then(response => {
        if(response.data == 1)
          this.messages.splice(index,1);
        else
          this.alertInfo('删除失败','error');
      }).catch(response => {this.alertInfo('删除失败','error');});
    },
    // 删除回复
    clearReply(id,mindex,rindex){
      if(!window.confirm("确定要删除吗?")){
        return false;
      }
      axios.post(this.$store.state.clearReplyUrl+id).then(response => {
        if(response.data == 1)
          this.messages[mindex].messageReplyList.splice(rindex,1);
        else
          this.alertInfo('删除失败','error');
      }).catch(response => {this.alertInfo('删除失败','error');});
    }
  }
}
</script>

<style>
  .blog-massage-page{
    position: relative;
  }
  .message-info-box{
    display: none;
  }

  .in-message-info-box {
    display: block;
    position: absolute;
    top: 0; left:20px;
    width: 270px;
    height: 200px;
    margin: auto;
    background: #fff;
    box-shadow: 2px 2px 16px #ccc;
  }
  .in-message-info-box ul{
    list-style: none;
  }
  .in-message-info-box ul .close{
    float: right;
    cursor: pointer;
  }
  .in-message-info-box ul .enter-but{
    padding: 0px;
  }
  .in-message-info-box ul .enter-but button{
    width:135px;
    background: #fff;
    padding: 5px;
    outline: none;

    border:none;
  }
  .in-message-info-box ul input{
    border: none;
    outline: none;
  }
  .in-message-info-box ul li{
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .blog-massage-box{
    width: 1128px;
    /*height:700px;*/
    background: #fff;
    margin: 0 auto;
  }

  .blog-massage-iuput{
    width: 100%;
    height:200px;
  }
  .blog-massage-iuput .poto-author{
    display: inline-block;
    width:80px;
    height: 200px;
    padding-left: 40px;
  }

  .blog-massage-iuput .poto-author .poto{
    width: 60px;
    height: 60px;
    background: #aaa;
    margin: 30px 0px 0px 10px;
    border-radius: 50%;
  }


  .blog-massage-iuput .poto-author .author{
    text-align: center;
  }

  .blog-massage-iuput .m-input{
    float: right;
    width: 89%;
    height: 200px;
  }
  .blog-massage-iuput .m-input  textarea{
    width: 92%;
    height: 100px;
    font-size: 18px;
    margin: 30px 0px 0px 10px;
    color: #000;
    font-size: 16px;
    padding: 5px 5px 0px 10px;
    resize: none;

  }
  .blog-massage-iuput .m-input .submit-mesasge{
    width: 94%;
    height: 40px;
    margin: 20px 0px 10px 10px;
  }
  .blog-massage-iuput .m-input .submit-mesasge > button{
    float: right;
  }

  /* 留言内容  S  */
  .blog-massage-content{
    width: 100%;
  }
  .blog-massage-content > ul{
    width: 90%;
    list-style: none;
    padding: 10px;
    margin: 0 auto;
  }
  .blog-massage-content ul > li{
    min-height: 40px;
    padding: 10px;
    border:1px solid #eee;
    overflow: hidden;
  }

  .blog-massage-content .poto{
    width: 60px;
    height: 60px;
    background: #aaa;
    margin-left: 22px;
    border-radius: 50%;
  }
  .blog-massage-content .poto-author{
    display: inline-block;
    width:80px;
    height: 100px;
  }
  .blog-massage-content .m-content{
    /*float: right;*/
    width: 90%;
    min-height: 100px;
    /*background: pink;*/
  }

 .blog-massage-content .m-content .nickname{
   font-size: 20px;
   padding: 5px;
 }
  .blog-massage-content .m-content-reply{
    width: 100%;
    border-left:40px solid #fff;
    padding: 8px;
    color: #80817f;
    background: #f8f8f7;
  }
  .blog-massage-content .m-content-reply .item-reply{
    padding: 4px;
    border-bottom: 1px solid #ccc;
  }

  .blog-massage-content .m-content .nickname::before{
    content: ' ';
    border-left:6px solid #409eff ;
  }


  .blog-massage-content .m-content .content{
    padding: 5px;
  }

  .blog-massage-content .m-content .time{
    padding: 5px;
    color: #ccc;
  }
  /* 留言内容  E */


  /* 回复 S */
  .comments-form__body{
    margin-top: 20px ;
  }

  .comments-form__body .comments-form__edit{
    position: relative;
    width: 100%;
    border: 1px solid #dededd;
    background-color: #fff;
    margin-top: 20px;
   }

  .comments-form__body .comments-form__edit textarea{
    display: block;
    /*border: none;*/
    height: 100%;
    width: 100%;
    resize: none;
    padding: 10px;
    transition: background-color .2s;
  }
  .comments-form__body .mo-left{
    float: right;
    margin: 10px 10px 0px 0px;
  }


  .blog-massage-content .m-content-reply-box{
    overflow: hidden;
    height: auto;
    max-height: 85px;
  }

  .blog-massage-content .reply-box-show{
    max-height: none;
  }
  /* 回复 E */

</style>
