var getContainer=document.getElementById("container");
var picSlides=document.getElementsByClassName("picSlide");
var points=document.getElementsByTagName("span");
var previous=document.getElementById("preSlide");
var next=document.getElementById("nextSlide");
var index=0;
var timer;

// 第三步，定义鼠标经过和鼠标离开所触发的函数：
// 1.鼠标经过，取消定时函数
// 2.鼠标离开，触发定时函数
// 3.由于一进页面图片就需要进行切换，因此函数最后添加onmouseout()自动触发鼠标离开事件，即自动执行定时函数。也可以直接添加定时函数startSlide()
function moveOn(){
	getContainer.onmouseover=function(){
		clearInterval(timer);
	}
	getContainer.onmouseout=function(){
		startSlide();
	}
	getContainer.onmouseout();            //或者直接执行startSlide()

// 第四步，点击圆点进行相应图片切换：
	for(var j=0;j<points.length;j++){     //遍历span标签
		points[j].index=j;                //给每个span定义下标以方便获取使用
		points[j].onclick=function(){     //定义某个span的点击事件
			index=this.index;             //赋值给变量index，即被点击的span的下标
			changePic();                  //获得新的index值，传给换图函数changePic(),切换相应的图片，并作出相应样式设置
		}
	}

// 第五步，定义前一页函数和后一页函数：
	previous.onclick=function(){          //绑定前一张点击事件
		index--;                          //前一张index即当前对象的index减去1
		if(index<0){                      //但是下标不能为负值，最小为0
			index=picSlides.length-1;     //index小于0的话，则回到最后一张图片，以此循环
		}
		changePic();                      //传递index的值给换图函数changePic()，切换相应的图片，并作出相应的样式设置
	}
	next.onclick=function(){              //绑定后一张点击事件
		index++;                          //后一张index即当前对象的index加1
		if(index>=picSlides.length){      //但是下标不能大于等于picSlides的数组长度
			index=0;                      //否则回到首张图片的下标，以此循环
		}
		changePic();                      //传递index的值给换图函数changePic()，切换相应的图片，并作出相应的样式设置
	}
}
// 第二步，定义定时函数：
// 1.让index递增，以便传递新下标给换图函数（这样换图函数才能对下一张图片进行显示操作）
// 2.限制index的递增范围，必须要在图片数（类名为picSlide的div数量）范围之内，如果超过范围，回到index=0重新递增，即重新从第一张图片开始进行显示设置
// 3.执行换图函数，定时3秒执行一次，每次都会传递一个新的index值给换图函数
function startSlide(){
	timer=setInterval(function(){
		index++;
	if(index>=picSlides.length){
		index=0;
	}
	changePic();
	}
		,2000)	
}
// 第一步，定义换图函数：
// 1.遍历所有图片容器div和用作选项圆点的span标签，分别对其进行隐藏和样式还原
// 2.对下标同为index值的div和span分别进行显示操作和样式设置
function changePic(){
	for(var i=0;i<picSlides.length;i++){
		picSlides[i].style.display="none";
		points[i].className=" ";
	}
	picSlides[index].style.display="block";
	points[index].className="pointSelected";
}

moveOn();               //由于一进页面，鼠标经过离开，点击圆点和前后翻页事件都需要具备触发条件，所以其封装函数moveOn需要被执行