
/*
  @param meaning 字符串裁剪  获取焦点的时候滚动显示
  @param string _str:要滚动的字符串
  @param DIV _targerElementName:字符串要显示的地方的id，可以是某个div或者td的id
  @param number curFonsize:字符串的文字大小的限制
  @param number speed:滚动的速度
*/
function marqueeText(_str,_targerElementName,_curFonsize,_speed){   
    var timeFlag = 0,
        txtSpan1 = "",
        txtSpan2 = "",
        windowDiv  = "",
        topDiv =  "",
        fontSize = _curFonsize, //当前元素限定字体的大小
        textLength = 0,
        textSpeed = _speed || 30; // 滚动的速度
    function createScrollDiv(_divName,_text){
        initElement(_divName,_text);
        window.setInterval(Marquee,textSpeed);
    }
    function initElement(_divName,_text){
        textLength = _text.replace(/[^\x00-\xff]/g,"**").length;
        topDiv = document.getElementById(_divName);
        topDiv.innerHTML = "";
        
        windowDiv = document.createElement("div");
        txtSpan1 = document.createElement("span");
        txtSpan2 = document.createElement("span");

        windowDiv.appendChild(txtSpan1);
        windowDiv.appendChild(txtSpan2);
        topDiv.appendChild(windowDiv);

        windowDiv.style.position = "relative";
        windowDiv.style.width = topDiv.offsetWidth + "px";
        windowDiv.style.height = topDiv.offsetHeight + "px";
        windowDiv.style.overflow = "hidden";
        windowDiv.style.textAlign = "center";

        txtSpan1.innerHTML = _text;
        txtSpan1.style.float = "left";
        txtSpan1.style.textAlign="left";
        txtSpan1.style.width = fontSize*textLength/2  + windowDiv.offsetWidth + "px";
        txtSpan1.style.height = topDiv.offsetHeight + "px";
        txtSpan1.style.lineHeight = topDiv.offsetHeight + "px";
        txtSpan1.style.display = "block";
        txtSpan1.style.wordWrap = "normal";
        txtSpan1.style.overflow = "hidden";

        txtSpan2.innerHTML = _text;
        txtSpan2.style.position = "relative";
        txtSpan2.style.textAlign="left";
        txtSpan2.style.left = windowDiv.offsetWidth + "px";
        txtSpan2.style.width = fontSize*textLength/2  + windowDiv.offsetWidth + "px";
        txtSpan2.style.height = topDiv.offsetHeight + "px";
        txtSpan2.style.lineHeight = topDiv.offsetHeight + "px";
        txtSpan2.style.display = "none";
    }
    function Marquee(){
        if(timeFlag == 0){
            if(txtSpan1.offsetWidth - windowDiv.offsetWidth - windowDiv.scrollLeft<=0){
                txtSpan1.style.display = "none";
                txtSpan2.style.display = "block"
                windowDiv.scrollLeft = 0;
                timeFlag = 1;
            }else{             
                windowDiv.scrollLeft++;
            }
        }else{
            if(txtSpan2.offsetWidth - windowDiv.scrollLeft<=0){             
                windowDiv.scrollLeft = 0;
            }else{             
                windowDiv.scrollLeft++;
            }
        }
    }
    createScrollDiv(_targerElementName,_str);
}
marqueeText.prototype.getDisplayString = function(_str,_len,_fillInString){
    var str = _str || "";
    var len = _len || "";
    var fillInString = _fillInString || "";
    var totalLength = 0,//传入字符的长度
        toMarqueeFlag = false,//是否滚动
        position = 0,//确定需要截取字符串的位置
        char2 = 0,//上上个字符是否是双字节
        char1 = 0,//上个字符是否是双字节
        char0 = 0,//当前字符是否是双字节
        num = 0,
        intCode = 0,
        substr = '';
    for(var i = 0,length = str.length;i < length;i++){
      intCode = str.charCodeAt(i);//返回指定位置的字符的 Unicode 编码
      char1 = char0;
      char2 = char1;
      if(intCode >= 0 && intCode <= 128){
        totalLength += 1;//非中文单个字符长度加1
        char0 = 0; //非中文
      }else{
        totalLength += 2;//中文字符长度则加2
        char0 = 1;//中文
      }
      if(totalLength > len){
        /*如果是中文字符则totalLength为2的倍数，i也是2的倍数*/
        if(i % 2 == 1){
          position = i - 1;
        }else{
          position = i;
        }
        toMarqueeFlag = true;
        break;
      }
    }

    if(toMarqueeFlag){
      if(typeof(fillInString) == 'undefined'){
         substr = str.substring(0,position + 1);
      }else if(fillInString.length == 1){
         substr = str.substring(0,position);
      }else if(fillInString.length == 2){
        num = char1 == 1 ? 0 : 1;
        substr = str.substring(0,position - num) + fillInString;
      }else if(fillInString.length == 3){
        if (char1 == 1){
          substr = str.substring(0,position -1) + fillInString;
        }else{
          num = char2 == 1 ? 1 : 2;
          substr = str.substring(0,i - num) + fillInString;
        }
      }
      return substr;
    }else{
      return str;
    } 
}