export default {
  hasClass( elements,cName ){
     return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
  },
  addClass( elements,cName ){
    if( !this.hasClass( elements,cName ) ){
      elements.className += " " + cName;
    };
  },
  removeClass( elements,cName ){
    if( this.hasClass( elements,cName ) ){
      elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
    };
  }

}
