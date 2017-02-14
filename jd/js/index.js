// JavaScript Document

$(function(){
	alert("请点击左侧导航栏 --> 计算机书籍 --> 进入查看");
	//---------------------------   左侧导航列表   ----------------------------------------------------------------------------

	var aListNav=$("div.page1").find("div.listnav").find("li");//所有左侧导航列表子项
	var oPopup=$("div.page1").find("div.popup");//弹框区块
	var aPopupCont=oPopup.find("div.section");//所有的弹框内容
	var popupTimer;//用于左侧导航的定时器
	var index=0;//列表项索引值

	aListNav.hover(
		function(){
			clearTimeout(popupTimer);
			index=$(this).attr("data-index"); //取得每个导航条的索引值
			//给当前悬停的li增加样式类，同时删除其他所有兄弟li的样式类
			$(this).addClass("li_ac").siblings("li").removeClass("li_ac");
			//对应的弹框区块显示，同时隐藏其他所有弹框区块
			oPopup.show();
			aPopupCont.eq(index).show().siblings("div.section").hide();
		},
		function(){
			popupTimer=setTimeout(function(){//鼠标移出时,清除样式类，隐藏弹框区块
				aListNav.removeClass("li_ac");
				oPopup.hide();
				aPopupCont.hide();
			},300);
		}
	);

	oPopup.hover(
		function(){//弹框区块移入时
			clearTimeout(popupTimer);
			oPopup.show();
		},
		function(){//弹框区块移出时
			aListNav.removeClass("li_ac");
			oPopup.hide();
		}
	);
	//轮播图
	var $ban=$("div.bannar"); //轮播图盒子
	var $banTab=new Tab($ban);

	//tab项
	var $tab=$("div[id*='floor']");

	//楼层导航
	var floor=$("a[href*='#floor']");//筛选出所有楼层导航的a标签
	var floorUl=$("ul.LocationFloorList");//楼层导航条
	var floorHeight=[];

//---------------------------   轮播图   ---------------------------------------------------------------------------------------------------------

	//轮播图 手动切换 自动切换 上一张图切换 下一张图切换
	$banTab.changeTab().autoRun().prevBtn().nextBtn1();

//---------------------------   tab项   ---------------------------------------------------------------------------------------------------------
	$tab.each(function(){
		var $subTab=new Tab($(this));
		$subTab.changeTab();
	});
	
//---------------------------   楼层导航   ---------------------------------------------------------------------------------------------------------

	//存储每个楼层对应显示的滚动条高度
	$tab.each(function(index){
		floorHeight[index]=$(this).offset().top-300
	});

	$(window).on("scroll", function () {
		if($(document).scrollTop()>0){
			$("a.gototop").show();
		}else{
			$("a.gototop").hide();
		};

		//判断滚动条高度,到达1楼离屏幕顶端300像素时,楼层导航显示
		if($(document).scrollTop()>=floorHeight[0]){
			floorUl.show();
			//判断滚动条高度,到达相应楼离屏幕顶端300像素时,相应楼层导航显示
			$tab.each(function(index){
				if($(document).scrollTop()>=floorHeight[index]){
					floorUl.find("li").eq(index).addClass("ac").siblings("li").removeClass("ac");
				};
			});
		}else{
			floorUl.hide();
		};
	});

	//点击楼层导航到达相应锚点
	floor.on("click", function () {
		var id=this.hash;
		$("html,body").finish().animate({scrollTop:$(id).offset().top},1000);
	});

	//gototop
	$("a.gototop").on("click", function () {
		var id=this.hash;
		$("html,body").finish().animate({scrollTop:0},1000);
	});
});

//---------------------------   封装tab对象   ---------------------------------------------------------------------------------------------------------
function Tab($obj){
	this.obj=$obj;
	this.aLi=$obj.find("ul").find("li");
	this.tabItem=$obj.find(".tabItem");
	this.preBtn=$obj.find("a.prevBtn");
	this.nextBtn=$obj.find("a.nextBtn");
	this.index=0;
};

//tab悬停切换
Tab.prototype.changeTab=function(){
	var _this=this;
	$(this.aLi).on("mouseenter",function(){
		_this.index=$(this).attr("data-index"); //取得每个按钮的索引值
		//给当前悬停的li增加样式类，同时删除其他所有兄弟li的样式类
		$(this).addClass("active").siblings("li").removeClass("active");
		//对应的图片显示，同时隐藏其他所有图片
		$(_this.tabItem).eq(_this.index).show().siblings(".tabItem").hide();
	});
	return this;
};

//tab自动轮播
Tab.prototype.autoRun=function(){
	var _this=this;
	var timer;
	function auto(){
		timer=setInterval(function(){
			_this.index++;
			if(_this.index==_this.aLi.length){
				_this.index=0;
			};
			//给当前悬停的li增加样式类，同时删除其他所有兄弟li的样式类
			$(_this.aLi).eq(_this.index).addClass("active").siblings("li").removeClass("active");
			//对应的图片显示，同时隐藏其他所有图片
			$(_this.tabItem).eq(_this.index).show().siblings(".tabItem").hide();
		},1000);
	};
	auto();
	$(this.obj).hover(
		function(){
			clearInterval(timer);
		},
		function(){
			auto();
		}
	);
	return this;
};

//切换上一张图片
Tab.prototype.prevBtn=function(){
	var _this=this;
	if(this.preBtn){
		$(this.preBtn).on("click",function(){
			_this.index--;
			if(_this.index<0){
				_this.index=0;
			};
			//给当前悬停的li增加样式类，同时删除其他所有兄弟li的样式类
			$(_this.aLi).eq(_this.index).addClass("active").siblings("li").removeClass("active");
			//对应的图片显示，同时隐藏其他所有图片
			$(_this.tabItem).eq(_this.index).show().siblings(".tabItem").hide();
		});
	};
	return this;
};

//切换下一张图片
Tab.prototype.nextBtn1=function(){
	var _this=this;
	if(this.nextBtn){
		$(this.nextBtn).on("click",function(){
			_this.index++;
			if(_this.index>=_this.aLi.length){
				_this.index=_this.aLi.length;
			};
			//给当前悬停的li增加样式类，同时删除其他所有兄弟li的样式类
			$(_this.aLi).eq(_this.index).addClass("active").siblings("li").removeClass("active");
			//对应的图片显示，同时隐藏其他所有图片
			$(_this.tabItem).eq(_this.index).show().siblings(".tabItem").hide();
		});
	};
	return this;
};