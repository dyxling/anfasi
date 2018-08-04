//displaying and hidding menu.
var toggleAll = function() {
	var navv = $("#main-nav");
	navv.on("mouseenter mouseleave", "#main-menu li", function(e) {
		if(e.type == "mouseenter") {
			if($(this).children('ul')) {
				$(this).children('ul').show();
			}
		}
		if(e.type == "mouseleave") {
			if($(this).children('ul')) {
				$(this).children('ul').hide();
			}
		}
	});
}();
//adjusting height and width.
var adjust=function(){
	var clienth=document.documentElement.clientHeight;
	var clientw=document.documentElement.clientWidth;
	var seth=parseInt(clienth)-342;
	var h2=document.getElementById("main-body").offsetHeight;
//	if(h2<seth){
//		document.getElementById("main-body").style.height=seth+"px";
//	}
	if(clientw<"1024"){
		document.getElementById("main-container").style.width=""+clientw+"px";
	}
}();
//adjusting width by itself.
window.onresize=function(){
	var clientw=document.documentElement.clientWidth;
	if(clientw<"1024"){
		document.getElementById("main-container").style.width=""+clientw+"px";
	}
	else{
		document.getElementById("main-container").style.width="1024px";
	}
};
