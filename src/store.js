/*
 vuex 的核心模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const hostName = 'http://localhost:8777/';
//const hostName = '/';
const state = {
  // 初始化默认选中导航
  activeIndex: '1',
  articles: [],
  hotArticle: [],
  articleUrl: hostName+'blog2/article/mmmi/',
  articleListUrl: hostName+'blog2/article/all/',
  articleHotUrl: hostName+'blog2/article/hot',
  articleSearch: hostName+'blog2/article/search',
  articleType: hostName+'blog2/article-type/type-all',
  messageUrl: hostName+'blog2/message/retrieve/',
  addMessageUrl: hostName+'blog2/message/in-message/',
  addReplyUrl: hostName+'blog2/message/in-reply/',
  isLogin: hostName+'blog2/hyy/isLogin/',
  clearMessageUrl: hostName+'blog2/message/destroy-message/',
  clearReplyUrl: hostName+'blog2/message/destroy-reply/'
//http://localhost/article/article-all
};

const mutations = {

};

const actions = {

};

const getters = {

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
