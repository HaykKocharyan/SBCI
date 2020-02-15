//pageYOffset
//pageXOffset
var MobileWidth = 767;
var TabletWidth = 959;
var DesktopWidth = 1599;

 document.addEventListener('DOMContentLoaded', function(){
	var width = document.body.clientWidth;

	if (width > TabletWidth){	//if we use pc than
		window.addEventListener('scroll', function() {	//add parallax function
  			let BgElement = document.getElementsByClassName("main-bg")[0];
  			BgElement.style.backgroundPosition = 'center ' + pageYOffset*0.7 + 'px';

		});
	}
});