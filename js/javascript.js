//sizes of desktops
var MobileWidth = 767;
var TabletWidth = 959;
var DesktopWidth = 1599;
document.addEventListener('DOMContentLoaded', Start);

function Start(){
	Parallax();

	/*AutoSlide();*/

	window.addEventListener('scroll', FadeInOnFocuse);	
}




/* functions for start function */
function Parallax(){
	var width = document.documentElement.clientWidth;
	let BgElement = document.getElementsByClassName("main-bg")[0];
	if (width > TabletWidth && BgElement != null){	//if we use pc than
		window.addEventListener('scroll', function() {	//add parallax function
  			BgElement.style.backgroundPosition = 'center ' + pageYOffset*0.7 + 'px';
		});
	}
}

/* beta version of AutoSlide */
/*function AutoSlide(){
	var slideElements = document.getElementsByClassName("autocycle");
	for (var i = 0; i < slideElements.length; i++) {
		slideElements[i].style.transform = 'translateX(0)';
	}
	var stepSize = new Array(slideElements.length);
	for (var i = 0; i < stepSize.length; i++) {
		stepSize[i] = slideElements[i].getAttribute("data-size");
		stepSize[i] = parseFloat(stepSize[i]);
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
			activetransform = parseFloat(activetransform.slice(11, activetransform.length-3));
			console.log((activetransform + size) % maxsize);
			element.style.transform = 'translateX(' + (activetransform - size) % maxsize + 'em)';
		}, slideElements[i].getAttribute("data-time"), slideElements[i], stepSize[i], elementSize[i]);
	}
}*/

function FadeInOnFocuse(){
	var elements = document.getElementsByClassName('fade-in-up-focuse');
	var twoThirdScreenSize = document.documentElement.clientHeight * 0.7;
	if (elements.length === 0)
		window.removeEventListener('scroll', FadeInOnFocuse);
	for (var i = 0; i < elements.length; i++) {
		var elementY = elements[i].getBoundingClientRect().top;

		if (elementY <= twoThirdScreenSize){
			elements[i].classList.add('fade-in-up');
			elements[i].classList.remove('fade-in-up-focuse');
		}
	}
}