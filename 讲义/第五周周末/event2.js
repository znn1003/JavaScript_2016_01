function on(ele,type,fn){
	if(ele.addEventListener){//如果支持标准浏览器的方法，则直接用此方法完成事件绑定
		ele.addEventListener(type,fn,false);
		return;	
	}
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];
		
		//下面这句代码代替了bind方法
		ele.attachEvent("on"+type,function (){run.call(ele)});

	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
	
	
}
function run(){
	var e=window.event;
	var type=e.type;
	if(!e.target){
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;}
		e.target=e.srcElement;
	}
	var a=this["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);//为了和标准浏览器的事件对象取得方式保持一致：事件对象是一个被系统自动传进去的实参	
			}else{
				a.splice(i,1);
				i--;
			}
		}	
	}
}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	var a=ele["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;	
			}
		}
	}
	
}