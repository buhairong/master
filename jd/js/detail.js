// JavaScript Document

/*$(function(){
	//图片切换
	var oPage2Tab=$("div.page2").find("div.tab");
	var tab=new Tab(oPage2Tab);
	//手动切换 上一张图 下一张图
	tab.changeTab().prevBtn().nextBtn1();

});*/


//---------------------------   封装tab对象   ---------------------------------------------------------------------------------------------------------
	function Tab(obj){
		this.obj=obj;
		this.oUl=obj.getElementsByTagName("ul")[0];
		this.aLi=this.oUl.getElementsByTagName("li");
		this.tabItem=obj.getElementsByClassName("tabItem");
		this.preBtn=obj.getElementsByClassName("prevBtn")[0];
		this.nextBtn=obj.getElementsByClassName("nextBtn")[0];
		this.n=0;
		this.lastIndex=0;
	};

	//tab悬停切换
	Tab.prototype.changeTab=function(){
		for(var i=0;i<this.aLi.length;i++){
			var _this=this;
			this.aLi[i].index=i;
			this.aLi[i].onmouseover=function(){
				_this.aLi[_this.lastIndex].className="";
				_this.tabItem[_this.lastIndex].style.display="none";
				this.className="active";
				_this.tabItem[this.index].style.display="block";
				_this.lastIndex=this.index;
				_this.n=this.index;
			};
		};
		return this;
	};

	//tab自动轮播
	Tab.prototype.autoRun=function(){
		var _this=this;
		var timer;
		function auto(){
			timer=setInterval(function(){
				_this.n++;
				if(_this.n==_this.aLi.length){
					_this.n=0;
				};
				_this.aLi[_this.lastIndex].className="";
				_this.tabItem[_this.lastIndex].style.display="none";
				_this.aLi[_this.n].className="active";
				_this.tabItem[_this.n].style.display="block";
				_this.lastIndex=_this.n;
			},1000);
		};
		auto();
		this.obj.onmouseover=function(){
			clearInterval(timer);
		};
		this.obj.onmouseout=function(){
			auto();
		};
		return this;
	};

	//切换上一张图片
	Tab.prototype.prevBtn=function(){
		if(this.preBtn){
			var _this=this;
			this.preBtn.onclick=function(){
				_this.lastIndex=_this.n;
				_this.n--;
				if(_this.n<0){
					_this.n=0;
				};
				_this.aLi[_this.lastIndex].className="";
				_this.tabItem[_this.lastIndex].style.display="none";
				_this.aLi[_this.n].className="active";
				_this.tabItem[_this.n].style.display="block";
				_this.lastIndex=_this.n;
			};
		};
		return this;
	};

	//切换下一张图片
	Tab.prototype.nextBtn1=function(){
		if(this.nextBtn){
			var _this=this;
			this.nextBtn.onclick=function(){
				_this.lastIndex=_this.n;
				_this.n++;
				if(_this.n>=_this.aLi.length-1){
					_this.n=_this.aLi.length-1;
				};
				_this.aLi[_this.lastIndex].className="";
				_this.tabItem[_this.lastIndex].style.display="none";
				_this.aLi[_this.n].className="active";
				_this.tabItem[_this.n].style.display="block";
				_this.lastIndex=_this.n;
			};
		};
		return this;
	};


	//图片切换区
	var oPage2=document.getElementsByClassName("page2")[0];
	var oPage2Tab=oPage2.getElementsByClassName("tab");
	
	//放大镜	
	var oBox1=oPage2.getElementsByClassName("s_img");
	var oBox2=oPage2.getElementsByClassName("zoom_img");
	
	//选择切换
	/*var selUl=oPage2.getElementsByClassName("select")[0].getElementsByTagName("ul")[0];
	var selLi=selUl.getElementsByTagName("li");
	var selGoods=new selTab(selLi,oPage2Tab);	*/
	
	//数量增减
	var numInput=oPage2.getElementsByTagName("input")[0];
	var addBtn=oPage2.getElementsByClassName("add")[0];
	var redBtn=oPage2.getElementsByClassName("reduce")[0];
	var lastVal=numInput.value; //记录最后一次输入的有效值
	var maxNum=199; //库存数
	
	//商品组合切换
	var oPage3=document.getElementsByClassName("page3")[0];
	var oPage3Tab=oPage3.getElementsByClassName("tab")[0];
	var page3Tab=new Tab(oPage3Tab);
	
	
	
//---------------------------   放大镜   ---------------------------------------------------------------------------------------------------------	
	
	//遍历每张图片,调用放大镜函数
	for(var i=0;i<oBox1.length;i++){
		var oSpan=oBox1[i].getElementsByTagName("span")[0];
		var bigImg=oBox2[i].getElementsByTagName("img")[0];
		zoom(oBox1[i],oBox2[i],bigImg,oSpan);
	};
	
//---------------------------   图片切换区   ---------------------------------------------------------------------------------------------------------
	//遍历所有图片样式
	for(var i=0;i<oPage2Tab.length;i++){
		var tab=new Tab(oPage2Tab[i]);
		tab.changeTab();//手动切换
		tab.prevBtn(); //上一张图
		tab.nextBtn1();//下一张图
	};

	
//---------------------------   选择切换样式   ---------------------------------------------------------------------------------------------------------

	//selGoods.changeTab();
	
	
//---------------------------   数量增减   --------------------------------------------------------------------------------------------------------

	//判断是不是数字
	function isNum(str){   //字符
		var re=/^[1-9]\d*$/; //验证是否有效数字
		return re.test(str);
	};

	//判断按钮状态
	function btnStauts(num){
		//判断数值是否小于1
		if(num<=1){
			redBtn.className="reduce dis";
			redBtn.disabled=true;
		}else{
			redBtn.className="reduce";
			redBtn.disabled=false;
		};
		//判断数值是否大于库存
		if(num>=199){
			addBtn.className="add dis";
			addBtn.disabled=true;
		}else{
			addBtn.className="add";
			addBtn.disabled=false;
		};
	};
	
	//验证输入框是否为有效数字
	numInput.onkeyup=function(){
		var val=numInput.value;
		if(isNum(val)){ //判断输入是否为有效数字
			lastVal=val;
			if(val>maxNum){ //判断是否大于库存
				lastVal=numInput.value=maxNum;				
			};
			btnStauts(lastVal);
		}else{
			numInput.value=lastVal;
		};		
	};
	
	//增加按钮点击事件
	addBtn.onclick=function(){
		lastVal++;
		numInput.value=lastVal;	
		btnStauts(lastVal);
	};
	
	//减少按钮点击事件
	redBtn.onclick=function(){
		lastVal--;
		numInput.value=lastVal;	
		btnStauts(lastVal);
	};
	
//---------------------------   商品组合切换区   ---------------------------------------------------------------------------------------------------------
	//page3Tab.changeTab();//手动切换






//---------------------------   封装tab对象 用于商品选择切换 ------------------------------------------------------------------------------------------------------	
function selTab(tab,tabItem){
	this.aLi=tab;
	this.tabItem=tabItem;	
	this.lastIndex=0;		
};

//tab点击切换
selTab.prototype.changeTab1=function(){
	for(var i=0;i<this.aLi.length;i++){
		var _this=this;
		this.aLi[i].index=i;
		this.aLi[i].onclick=function(){				
			_this.aLi[_this.lastIndex].className="";	
			_this.tabItem[_this.lastIndex].style.display="none";
			this.className="active";	
			_this.tabItem[this.index].style.display="block";
			_this.lastIndex=this.index;
		};
	};	
	return this;	
};

//制作放大镜
function zoom(obj1,obj2,img,zoom){//小图盒子 对象，大图盒子 对象，原图 对象，放大镜 对象
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
}