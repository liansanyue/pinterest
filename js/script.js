var imgdata={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'},]};

window.onload=function(){
  show("content","box");
    window.onscroll=function(){
        if(checkscrollside("content","box")){
           var parent=document.getElementById("content");// 父级对象
            for(var i=0;i<imgdata.data.length;i++){
                var box=document.createElement('div'); //添加 元素节点
                box.className='box';                   //添加 类名 name属性
                parent.appendChild(box);              //添加 子节点
                var boxImg=document.createElement('div');
                boxImg.className='box_img';
                box.appendChild(boxImg);
                var Img=document.createElement('img');
                Img.src='img/'+imgdata.data[i].src;
                Img.onload=function(){}
                boxImg.appendChild(Img);
            }
            show("content","box");

        };
    }
}
 
 function show(parentid,boxclass){
	 	var parent=document.getElementById(parentid);
	 	if(document.getElementsByClassName){
	 	    var boxs=document.getElementsByClassName(boxclass);
	    }else{
	 	    var boxs=getClassObj(parent,boxclass);
        }

        var boxWidth=boxs[0].offsetWidth;//一个盒子的宽度
        var num=Math.floor(document.documentElement.clientWidth/boxWidth);//每行中能容纳的box个数=窗口宽度/一个块框宽度
        parent.style.cssText='width:'+boxWidth*num+'px;margin:0 auto;';
        var boxHeightArr=[];
        for(var i=0,len=boxs.length;i<len;i++){
        	if(i<num){
        		boxHeightArr[i]=boxs[i].offsetHeight;
        	}else{

        		var minHeight=Math.min.apply(null,boxHeightArr);
        		//Array.prototype.indexOf在IE9中才支持，所以不采用该方法
        		var minHIndex=getIndex(boxHeightArr,minHeight);
        		boxs[i].style.cssText="position:absolute;top:"+minHeight+"px;left:"+boxs[minHIndex].offsetLeft+"px";
        	    boxHeightArr[minHIndex]+=boxs[i].offsetHeight;//更新添加了块框后的列高
        	}
        }
        return Math.max.apply(null,boxHeightArr);
 }
 function getClassObj(parent,className){
    var all=parent.getElementsByTagName('*');//获取 父级的所有子集
    var classElem=[];//创建一个数组 用于收集子元素
    for (var i=0;i<all.length;i++) {//遍历子元素、判断类别、存入数组
        if (all[i].className==className){
            classElem.push(all[i]);
        }
    };
    return classElem;
}
function getIndex(arr,item){
    for(var i=0,len=arr.length;i<len;i++){
        if(arr[i]==item){
            return i;
        }
    }
}
function checkscrollside(parentid,boxclass){
   var parent=document.getElementById(parentid);
   if(document.getElementsByClassName){
	 	    var boxs=document.getElementsByClassName(boxclass);
	    }else{
	 	    var boxs=getClassObj(parent,boxclass);
        }
    var lastBoxHeight=boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastBoxHeight<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}
 