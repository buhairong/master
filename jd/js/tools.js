// JavaScript Document

/*---------------------------------------------------------------------------------------------------------------------------------------------------------

1、DOM加载
function documentReady(fn) //执行内容 函数

2、鼠标拖拽函数
function drag(obj,title) //移动区块 对象,拖拽区块 对象

3、移动区块内的子元素取消冒泡
function clearDrag(obj) //需要取消冒泡的子元素 对象

4、元素绝对居中
function showCenter(obj) //需要居中的元素 对象

5、添加类名
function addClass(obj,newClassName) //需要添加类名的元素 对象,需要新增的类名 字符串

6、制作纵向滚动条
function getScrollBar(rollBar,parent,text) //滚动条 对象，父级盒子 对象，父级盒子内容 对象

7、制作放大镜
function zoom(obj1,obj2,img,zoom) //小图盒子 对象，大图盒子 对象，原图 对象，放大镜 对象

8、制作放大镜(在小图上放大)
function zoom1(obj1,obj2,img) //小图盒子 对象，大图盒子(放大镜) 对象，原图 对象

9、元素四角与四边放大缩小处理函数
function dragZoom(aSpan,oDiv) //四角与四边控制元素缩放的子元素 对象集合,需要进行缩放的元素 对象

10、元素四角与四边放大缩小处理函数
function dragZoom(aSpan,oDiv) //四角与四边控制元素缩放的子元素 对象集合,需要进行缩放的元素 对象

11、判断是不是中文
function isChinese(str) //字符 单字节

12、运动函数
move:function(obj,modeJson,fn,time) //对象  运动json 回调函数	速度

13、移动到页面锚点
moveNav:function(start,end){//起始位置 number,目标位置 number

14、计算offsetTop
offsetTop:function (elm) //元素 对象
	
14、计算offsetLeft
offsetLeft:function(elm) //元素 对象

---------------------------------------------------------------------------------------------------------------------------------------------------------*/


//DOM加载
function documentReady(fn){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);  //dom内容加载完毕
	else{
		document.attachEvent('onreadystatechange', function (){//IE兼容
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};

var tools={
	//鼠标拖拽函数
	 drag:function(obj,title){//移动区块 对象,拖拽区块 对象
	
		title=title||obj; //如果没有设置拖拽区块(例如标题栏)，那么拖拽区块就是移动区块本身
		
		//鼠标按下时，触发拖拽事件
		title.onmousedown=function(ev){
			ev=ev||window.event; //如果为ie8以下浏览器时，ev为window.event
			var disX=ev.clientX-obj.offsetLeft; //获得鼠标按下时X轴初始值
			var disY=ev.clientY-obj.offsetTop;	//获得鼠标按下时Y轴初始值	
			//鼠标移动时，触发事件
			document.onmousemove=function(ev){
				ev=ev||window.event;
				var x=ev.clientX-disX;//获得鼠标X轴坐标
				var y=ev.clientY-disY;//获得鼠标y轴坐标
				var screenX=document.documentElement.clientWidth;//获得当前浏览器窗口的宽度
				var screenY=document.documentElement.clientHeight;//获得当前浏览器窗口的高度
				
				//当移动区块Y轴坐标值到达当前浏览器窗口顶端时，停止向上移动
				if(y<0){
					y=0;
				};	
				
				//当移动区块Y轴坐标值到达当前浏览器窗口底部时，停止向下移动
				if(y>screenY-obj.offsetHeight){
					y=screenY-obj.offsetHeight;
				};
				
				//当移动区块X轴坐标值到达当前浏览器窗口最左边时，停止向左移动
				if(x<0){
					x=0;
				};	
				
				//当移动区块Y轴坐标值到达当前浏览器窗口最右边时，停止向右移动
				if(x>screenX-obj.offsetWidth){
					x=screenX-obj.offsetWidth;
				};	
				
				obj.style.left=x+"px"; //设置移动区块的X轴坐标
				obj.style.top=y+"px"; //设置移动区块的Y轴坐标
						
			};
			
			//鼠标按键释放时，移动事件终止
			document.onmouseup=function(){
				document.onmousemove=null;	
			};
			
			return false;//取消子元素冒泡
		};
	},
	
	//移动区块内的子元素取消冒泡
	clearDrag:function(obj){//需要取消冒泡的子元素 对象
		obj.onmousedown=function(ev){
			ev=ev||window.event;
			ev.cancelBubble=true;
		};
	},
	
	//元素绝对居中
	showCenter:function(obj){//需要居中的元素 对象
		obj.style.display="block";
		
		function center(){
			var screenX=document.documentElement.clientWidth;//获得当前浏览器窗口的宽度
			var screenY=document.documentElement.clientHeight;//获得当前浏览器窗口的高度
			//设置元素X轴坐标
			obj.style.left=(screenX-obj.offsetWidth)/2+"px";  
			//设置元素Y轴坐标
			obj.style.top=(screenY-obj.offsetHeight)/2+"px"; 
		};
		
		center();
		//浏览器窗口尺寸调整时，依然绝对居中
		window.onresize=function(){
			center();
		};
	},
	
	//添加类名
	addClass:function(obj,newClassName){//需要添加类名的元素 对象,需要新增的类名 字符串
		if(obj.className==""){//当元素没有类名时
			obj.className=newClassName;
		}else{//当元素已有类名时
			obj.className=className+" "+newClassName;
		};
		return obj.className;
	},
	
	//制作纵向滚动条
	getScrollBar:function(rollBar,parent,text){//滚动条 对象，父级盒子 对象，父级盒子内容 对象
		rollBar.onmousedown=function(ev){
			ev=ev||window.event;
			
			var disY=ev.clientY-rollBar.offsetTop;//获得鼠标Y轴坐标
			
			//鼠标移动滚动条时触发事件
			document.onmousemove=function(ev){
				ev=ev||window.event;			
				var rollBarT=ev.clientY-disY;         //获得滚动条的y轴坐标
				var rollBarH=rollBar.offsetHeight;	  //获得滚动条的高度
				var parentH=parent.offsetHeight;     //获得父级盒子的高度
				var textH=text.offsetHeight;        //获得父级盒子内容的高度
				
				//控制滚动条移动区域,滚动条到达父级盒子顶部时，停止向上移动
				if(rollBarT<0){
					rollBarT=0;
				};
				
				//控制滚动条移动区域,滚动条到达父级盒子底部时，停止向下移动
				if(rollBarT>parentH-rollBarH-2){
					rollBarT=parentH-rollBarH-2;
				};
				
				rollBar.style.top=rollBarT+"px";  //获得滚动条的Y轴坐标
				//计算比率
				var rate=rollBarT/(parentH-rollBarH-2); 
				text.style.top=-(textH-parentH)*rate+"px";//控制父级盒子内容的Y轴坐标
			};
			
			//鼠标按键释放时，移动事件终止
			document.onmouseup=function(){
				document.onmousemove=null;
			};
			
			return false;	//取消子元素冒泡	
		};
	},	
	
	//制作放大镜
	zoom:function(obj1,obj2,img,zoom){//小图盒子 对象，大图盒子 对象，原图 对象，放大镜 对象
		obj1.onmousemove=function(ev){
			ev=ev||window.event;
			obj2.style.display=zoom.style.display="block";        //鼠标移动进小盒子区块内时，放大镜与大盒子显示
			var scroll_top=document.documentElement.scrollTop || document.body.scrollTop; //当页面出现滚动条时，计算滚动条高度，没有滚动条时，滚动条高度为0
			
			//获得鼠标X轴坐标
			var l=ev.clientX-tools.offsetLeft(obj1)-zoom.offsetWidth/2;  
			//获得鼠标Y轴坐标
			var t=ev.clientY-tools.offsetTop(obj1)+scroll_top-zoom.offsetHeight/2;
			
			//控制放大镜移动区域,放大镜到达父级盒子最左端时，停止向左移动
			if(l<0){
				l=0;
			};
			//控制放大镜移动区域,放大镜到达父级盒子最顶端时，停止向上移动
			if(t<0){
				t=0;
			};
			//控制放大镜移动区域,放大镜到达父级盒子最右端时，停止向右移动
			if(l>obj1.offsetWidth-zoom.offsetWidth){
				l=obj1.offsetWidth-zoom.offsetWidth;
			};
			
			//控制放大镜移动区域,放大镜到达父级盒子最底端时，停止向下移动
			if(t>obj1.offsetHeight-zoom.offsetHeight){
				t=obj1.offsetHeight-zoom.offsetHeight;
			};
			
			//获得放大镜的X轴坐标
			zoom.style.left=l+"px";
			
			//获得放大镜的Y轴坐标
			zoom.style.top=t+"px";
			
			//计算宽度比率
			var rateX=l/(obj1.offsetWidth-zoom.offsetWidth);    
			//计算高度比率                  
			var rateY=t/(obj1.offsetHeight-zoom.offsetHeight);
			//控制原图X轴坐标
			img.style.left=-(img.offsetWidth-obj2.offsetWidth)*rateX+"px";
			//控制原图Y轴坐标
			img.style.top=-(img.offsetHeight-obj2.offsetHeight)*rateY+"px";
			
		};
		
		obj1.onmouseout=function(){
			obj2.style.display=zoom.style.display="none";        //鼠标移动出小盒子区块时，放大镜与大盒子隐藏	
		};
	},
	
	//制作放大镜(在小图上放大)
	zoom1:function(obj1,obj2,img){//小图盒子 对象，大图盒子(放大镜) 对象，原图 对象
		obj1.onmousemove=function(ev){
			ev=ev||window.event;
			obj2.style.display="block";        //鼠标移动进小盒子区块内时，放大镜与大盒子显示
			var scroll_top=document.documentElement.scrollTop || document.body.scrollTop; //当页面出现滚动条时，计算滚动条高度，没有滚动条时，滚动条高度为0
			
			//获得鼠标X轴坐标
			var l=ev.clientX-obj1.offsetLeft-obj2.offsetWidth/2;  
			//获得鼠标Y轴坐标
			var t=ev.clientY-obj1.offsetTop+scroll_top-obj2.offsetHeight/2;
			
			//控制放大镜移动区域,放大镜到达父级盒子最左端时，停止向左移动
			if(l<0){
				l=0;
			};
			//控制放大镜移动区域,放大镜到达父级盒子最顶端时，停止向上移动
			if(t<0){
				t=0;
			};
			//控制放大镜移动区域,放大镜到达父级盒子最右端时，停止向右移动
			if(l>obj1.offsetWidth-obj2.offsetWidth){
				l=obj1.offsetWidth-obj2.offsetWidth;
			};
			
			//控制放大镜移动区域,放大镜到达父级盒子最底端时，停止向下移动
			if(t>obj1.offsetHeight-obj2.offsetHeight){
				t=obj1.offsetHeight-obj2.offsetHeight;
			};
			
			//获得放大镜的X轴坐标
			obj2.style.left=l+"px";
			
			//获得放大镜的Y轴坐标
			obj2.style.top=t+"px";
			
			//计算宽度比率
			var rateX=l/(obj1.offsetWidth-obj2.offsetWidth);    
			//计算高度比率                  
			var rateY=t/(obj1.offsetHeight-obj2.offsetHeight);
			//控制原图X轴坐标
			img.style.left=-(img.offsetWidth-obj2.offsetWidth)*rateX+"px";
			//控制原图Y轴坐标
			img.style.top=-(img.offsetHeight-obj2.offsetHeight)*rateY+"px";
			
		};
		
		obj1.onmouseout=function(){
			obj2.style.display="none";        //鼠标移动出小盒子区块时，放大镜与大盒子隐藏	
		};
	},
	
	//元素四角与四边放大缩小处理函数
	dragZoom:function(aSpan,oDiv){//四角与四边控制元素缩放的子元素 对象集合,需要进行缩放的元素 对象
		
		//调用鼠标拖拽函数，让父级盒子可移动
		drag(oDiv);
		
		//让每一个控件（四角与四边）调用缩放函数
		for(var i=0;i<aSpan.length;i++){
			dragFn(aSpan[i]);	
		};
		
		function dragFn(obj){
			//当组件被鼠标按住时，触发事件
			obj.onmousedown=function(ev){
				var oEv=ev||event;
				oEv.cancelBubble=true;				//控件触发鼠标按住事件时，取消冒泡
				var oldWidth=oDiv.offsetWidth;    //获得原图宽度
				var oldHeight=oDiv.offsetHeight;  //获得原图高度
				var oldX=oEv.clientX;			//获得鼠标按下时的X轴坐标
				var oldY=oEv.clientY;			//获得鼠标按下时的Y轴坐标
				var oldLeft=oDiv.offsetLeft;  //获得原图left值
				var oldTop=oDiv.offsetTop;  //获得原图top值
				
				//当组件被鼠标按住并拖拽时，触发事件
				document.onmousemove=function(ev){
					var oEv=ev||event;
					
					//左上组件被拖拽时
					if(obj.className=='tl'){
						oDiv.style.width=oldWidth-(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.left=oldLeft+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的left值
						oDiv.style.height=oldHeight-(oEv.clientY-oldY)+'px';	//鼠标拖拽时，获得新的高度
						oDiv.style.top=oldTop+(oEv.clientY-oldY)+'px';	//鼠标拖拽时，获得新的top值
					};
					
					//右上组件被拖拽时
					if(obj.className=='tr'){
						oDiv.style.width=oldWidth+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.height=oldHeight-(oEv.clientY-oldY)+'px';//鼠标拖拽时，获得新的高度	
						oDiv.style.top=oldTop+(oEv.clientY-oldY)+'px';		//鼠标拖拽时，获得新的top值
					};
					
					//左下组件被拖拽时
					if(obj.className=='bl'){
						oDiv.style.width=oldWidth-(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.left=oldLeft+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的left值
						oDiv.style.height=oldHeight+(oEv.clientY-oldY)+'px';//鼠标拖拽时，获得新的高度	
					};
					
					//右下组件被拖拽时
					if(obj.className=='br'){
						oDiv.style.width=oldWidth+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.height=oldHeight+(oEv.clientY-oldY)+'px';//鼠标拖拽时，获得新的高度
					};
					
					//顶部组件被拖拽时
					if(obj.className=='t'){
						oDiv.style.height=oldHeight-(oEv.clientY-oldY)+'px';	//鼠标拖拽时，获得新的高度
						oDiv.style.top=oldTop+(oEv.clientY-oldY)+'px';			//鼠标拖拽时，获得新的top值
					};
					
					//底部组件被拖拽时
					if(obj.className=='b'){
						oDiv.style.height=oldHeight+(oEv.clientY-oldY)+'px';	//鼠标拖拽时，获得新的高度
						oDiv.style.top=oldTop+'px';								//鼠标拖拽时，获得新的top值
					};
					
					//左侧组件被拖拽时
					if(obj.className=='l'){
						oDiv.style.width=oldWidth-(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.left=oldLeft+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的left值
					};
					
					//右侧组件被拖拽时
					if(obj.className=='r'){
						oDiv.style.width=oldWidth+(oEv.clientX-oldX)+'px';	//鼠标拖拽时，获得新的宽度
						oDiv.style.left=oldLeft+'px';						//鼠标拖拽时，获得新的left值
					};				
				};
				
				//鼠标移出组件时
				document.onmouseup=function(){
					document.onmousemove=null;//鼠标移动事件终止
				};	
				return false;
			};
		};	
	},
	
	//判断是不是中文
	isChinese:function(str){   //字符
		var reCh=/[u00-uff]/; //所有单字节字符(英文字母 数字等)
		return !reCh.test(str);
	},
	
	//读取样式
	getStyle:function (obj,styleName){
		var value= obj.currentStyle? obj.currentStyle[styleName] :getComputedStyle(obj,false)[styleName];
		if(styleName=="opacity"){
			value=Math.round(parseFloat(value)*100);
		}else{
			value=parseInt(value);
		};
		return value;
	},
	
	//运动
	move:function(obj,modeJson,fn,time){//对象  运动json 回调函数	速度
	
		//time=time||1000;
		//预定义速度
		var def_speed={
			veryslow:2500,
			slow:1500,
			normal:800,
			fast:600,
			veryfast:300
		};
		
		//判断速度
		if(time){
			if(typeof time=="string"){ //如果传入的是字符串
				
				time=def_speed[time]; //在对象内匹配字符串的值
			}
		}else{
			time=def_speed.normal;
		
		};
		
		//-----------------------------------
		
		var start={};
		var dis={};
		
		for(var key in modeJson){
			start[key]=this.getStyle(obj,key);
			dis[key]=modeJson[key]-start[key]
		}
		
		var count=parseInt(time/30)   //时间分段
		
		var i=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			i++;
			
			for(var key in modeJson){
				var a=1-i/count;
				
				var m_dis=start[key]+dis[key]*(1-a*a*a);
				
				if(key=="opacity"){
					obj.style.filter="alpha(opacity:"+m_dis+")"; //IE8
					obj.style.opacity=m_dis/100;
				}else{
					obj.style[key]=m_dis+"px";
				}
			
			}
			
			if(i==count){
				clearInterval(obj.timer);
				fn && fn();
			}
		
		},30);
	},
	
	//移动到页面锚点
	moveNav:function(start,end){//起始位置 number,目标位置 number
		var timer;
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	},	
	
	//计算offsetTop
	offsetTop:function (elm){ 
		var top = elm.offsetTop; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			top += parent.offsetTop; 
			parent = parent.offsetParent; 
		}; 
		return top; 
	}, 
	
	//计算offsetLeft
	offsetLeft:function(elm){ 
		var left = elm.offsetLeft; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			left += parent.offsetLeft; 
			parent = parent.offsetParent; 
		}; 
		return left; 
	},
	
	
	
}