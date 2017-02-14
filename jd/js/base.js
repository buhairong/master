// JavaScript Document

//创建主模块，依赖注入路由模块
var myapp=angular.module("myapp",["ngRoute"]);

//配置路由信息
myapp.config(function($routeProvider){
	$routeProvider.when("/",{templateUrl:"home.html",controller:"myCtrl"});//默认首页
	$routeProvider.when("/home",{templateUrl:"home.html",controller:"homeCtrl"});//首页
	$routeProvider.when("/products",{templateUrl:"products.html",controller:"productsCtrl"});//列表页
	$routeProvider.when("/detail",{templateUrl:"detail.html",controller:"detailCtrl"});//详情页
	$routeProvider.when("/detail/:id",{templateUrl:"detail.html",controller:"detailCtrl"});//详情页
	$routeProvider.when("/cart",{templateUrl:"cart.html",controller:"cartCtrl"});//购物车
	$routeProvider.otherwise({templateUrl:"routeNotFound.html",controller:"notFoundCtrl"});//错误路径页面
});

//创建购物车工厂，增删改查操作
myapp.factory("cartService",function(){
	//购物车数据存储 {products:{},number:1}
	var cart=[];

	return {
		//购物车添加新增商品以及选择数量
		add:function(product,num){
			for(var i=0;i<cart.length;i++){
				if(product.id==cart[i].product.id){
					cart[i].number+=num;
					return;
				};
			};
			cart.push({product:product,number:num});
		},

		//购物车内商品购买数量修改
		update:function(index,num){
			cart[index].number=num;
		},

		//购物车商品查询
		findAll:function(){
			return cart;
		},

		//删除购物车内商品
		remove:function(index){
			cart.splice(index,1);
		}
	};
});

//注册控制器
//顶层控制器
myapp.controller("myCtrl",function($scope,$http,cartService){
	//商品数据
	$scope.products=[];

	$http.get("product.json").success(function(data){
		$scope.products=data;
	});

	//购物车内商品数量累计
	$scope.countNum=function(){
		var total=0;
		angular.forEach(cartService.findAll(),function(c){
			total+= c.number;
		});
		return total;
	};

});

//首页控制器
myapp.controller("homeCtrl",function($scope){});

//商品列表页控制器
myapp.controller("productsCtrl",function($scope){});

//详情页控制器
myapp.controller("detailCtrl",function($scope,$routeParams,cartService){
	$scope.product={};//商品信息
	$scope.num=1;//商品购买数量
	var id=$routeParams["id"];//商品ID

	//遍历所有商品，通过ID找出对应商品信息
	for(var i=0;i<$scope.products.length;i++){
		if(id==$scope.products[i].id){
			$scope.product=$scope.products[i];
			break;
		};
	};

	//加入购物车
	$scope.addCart=function(){
		cartService.add($scope.product,$scope.num);
	};
});

//购物车控制器
myapp.controller("cartCtrl",function($scope,cartService){
	//地址
	$scope.address=[
		{
			province:"河南省",
			cities:[
				{city:"郑州市",xian:["郑州a县","郑州b县","郑州c县"]},
				{city:"开封市",xian:["开封a县","开封b县","开封c县"]},
				{city:"洛阳市",xian:["洛阳a县","洛阳b县","洛阳c县"]},
				{city:"安阳市",xian:["安阳a县","安阳b县","安阳c县"]}
			]
		},
		{
			province:"河北省",
			cities:[
				{city:"石家庄市",xian:["石家庄a县","石家庄b县","石家庄c县"]},
				{city:"邢台市",xian:["邢台a县","邢台b县","邢台c县"]},
				{city:"衡水市",xian:["衡水a县","衡水b县","衡水c县"]}
			]
		},
		{
			province:"湖北省",
			cities:[
				{city:"武汉市",xian:["武汉a县","武汉b县","武汉c县"]},
				{city:"黄冈市",xian:["黄冈a县","黄冈b县","黄冈c县"]},
				{city:"宜昌市",xian:["宜昌a县","宜昌b县","宜昌c县"]},
				{city:"襄阳市",xian:["襄阳a县","襄阳b县","襄阳c县"]}
			]
		}
	];
	//获得购物车数据
	$scope.cart=cartService.findAll();

	//设置运费
	$scope.shipping={price:10};

	//删除商品
	$scope.del=function(index){
		cartService.remove(index);
	};

	//应付金额
	$scope.payment=function(){
		var total=0;
		angular.forEach($scope.cart,function(c){
			total+= c.product.price* c.number;
		});
		return total;
	};

	//实付运费 99包邮
	$scope.$watch("payment()",function(newValue){
		$scope.shipping.price=newValue>=99?0:10;
	});

	//实付金额
	$scope.actual=function(){
		return $scope.payment()+$scope.shipping.price;
	};
});



$(function(){

//---------------------------   天气   ----------------------------------------------------------------------------

	getWeather();

	//城市切换
	$("select.city").on("change",function(){
		getWeather();
	});

	function getWeather(){
		var url="http://wthrcdn.etouch.cn/weather_mini?city="+$("select.city").val();
		$.getJSON(url,function(data){
			//日期
			$("span.date").html(data.data.forecast[0].date);
			//天气
			var weatherType=data.data.forecast[0].type;
			if(getWeatherIcon(weatherType)){
				$("span.weather").html("<img src='images/"+getWeatherIcon(weatherType)+"'>");
			}else{
				$("span.weather").html(weatherType);
			}
			//温度
			$("span.wendu").html(data.data.wendu);
		});
	};

	//天气图标
	function getWeatherIcon(weather){
		var _weather={
			"晴":"qing.png",
			"多云":"duoyun.png",
			"阴":"yin.png",
			"大雪":"day_daxue.png",
			"大雨":"day_dayu.png",
			"小雪":"day_xiaoxue.png",
			"小雨":"day_xiaoyu.png",
			"中雪":"day_zhongxue.png",
			"中雨":"day_zhongyu.png"
		};
		return _weather[weather];
	};
});


