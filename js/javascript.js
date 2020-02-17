//sizes of desktops
var MobileWidth = 767;
var TabletWidth = 959;
var DesktopWidth = 1599;
document.addEventListener('DOMContentLoaded', Start);

function Start(){
	Parallax();
	AutoSlide();
}




/* functions for start function */
function Parallax(){
	var width = document.body.clientWidth;

	if (width > TabletWidth){	//if we use pc than
		window.addEventListener('scroll', function() {	//add parallax function
  			let BgElement = document.getElementsByClassName("main-bg")[0];
  			BgElement.style.backgroundPosition = 'center ' + pageYOffset*0.7 + 'px';

		});
	}
}

function AutoSlide(){
	var slideElements = document.getElementsByClassName("autocycle");
	for (var i = 0; i < slideElements.length; i++) {
		slideElements[i].style.transform = 'translateX(0)';
	}
	var stepSize = new Array(slideElements.length);
	for (var i = 0; i < stepSize.length; i++) {
		stepSize[i] = slideElements[i].getAttribute("data-size");
		stepSize[i] = parseInt(stepSize[i]);
	}
	var elementSize = new Array(slideElements.length);
	for (var i = 0; i < elementSize.length; i++) {
		elementSize[i] = getComputedStyle(slideElements[i]).width;
		elementSize[i] = -stepSize[i] * slideElements[i].childElementCount;
	}
	var timers = new Array(slideElements.length);
	for (var i = 0; i < timers.length; i++) {
		timers[i] = setInterval((element, size, maxsize) => {
			var activetransform = element.style.transform;
			activetransform = parseInt(activetransform.slice(11, activetransform.length-3));
			console.log((activetransform + size) % maxsize);
			element.style.transform = 'translateX(' + (activetransform - size) % maxsize + 'em)';
		}, slideElements[i].getAttribute("data-time"), slideElements[i], stepSize[i], elementSize[i]);
	}
}