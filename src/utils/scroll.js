
export default {
  timer:-1,
  myScroll:null,
  pageScroll(callback) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // 当前页面的可视化高度
      var clientHeight = document.documentElement.clientHeight; //document.documentElement获取数据
      // 滚动条的高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //document.documentElement获取数据
      // 页面的总高度
      var scrollHeight = document.documentElement.scrollHeight;//document.documentElement获取数据

      callback(scrollTop,scrollHeight,clientHeight);
    }, 13)
  }
}
