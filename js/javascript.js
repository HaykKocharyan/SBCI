//sizes of desktops
var MobileWidth = 767;
var TabletWidth = 959;
var DesktopWidth = 1599;
document.addEventListener('DOMContentLoaded', Start);

function Start(){
	MainParallax();

	/*AutoSlide();*/

	window.addEventListener('scroll', FadeInOnFocuse);
	inputs = document.getElementsByClassName('contact-input');
}




/* functions for start function */
function MainParallax(){
	var width = document.documentElement.clientWidth;
	var bgElement = document.getElementsByClassName("main-bg")[0];
	if (width > TabletWidth && bgElement != null){	//if we use pc than
		var coef = parseFloat(bgElement.getAttribute('parallax-speed')) || 0.7;
		window.addEventListener('scroll', function() {	//add parallax function
  			bgElement.style.backgroundPosition = 'center ' + pageYOffset * coef + 'px';
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

var inputs;
function Valitadion(button = false){
	for (var i = 0; i < inputs.length; i++) {
		var element = inputs[i];
		var value = element.value;
		if (value != '' || button){
			if (element.name === 'FirstName' || element.name === 'LastName'){
				if (value.length < 3 || value.match(/(\d+)/) != undefined){
					ValidationFailed(element);
				}
			}else if (element.name === 'Email'){
				if (!emailIsValid(value))
					ValidationFailed(element);
			}else if (element.name === 'PhoneNumber'){
				if (isNaN(Number(value)))
					ValidationFailed(element);
			}
		}
	}

}
function ValidationFailed(element){
	console.log('failed ' + element.name);
}



function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}