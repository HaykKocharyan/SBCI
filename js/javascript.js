//sizes of desktops
var MobileWidth = 767;
var TabletWidth = 959;
var DesktopWidth = 1599;
document.addEventListener('DOMContentLoaded', Start);
var validationInterval;

function Start(){
	MainParallax();

	/*AutoSlide();*/

	window.addEventListener('scroll', FadeInOnFocuse);
	inputs = document.getElementsByClassName('contact-input');
	button = document.getElementsByClassName('contact-send-button')[0];
	if (document.getElementsByTagName('form').length != 0)
		validationInterval = setInterval(Validation, 100, true);
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



var button ;
var errors = new Array();
var inputs;
function Validation(){
	for (var i = 0; i < inputs.length; i++) {
		var element = inputs[i];
		var value = element.value;
		var indexInErrors = errors.indexOf(element);

		if (element.name === 'FirstName' || element.name === 'LastName'){
			if (value.length < 3 || value.match(/(\d+)/) != undefined){
				ValidationFailed(element);
			}else if (indexInErrors != -1)
				ValidationPassed(element, indexInErrors);

		}else if (element.name === 'Email'){
			if (!emailIsValid(value))
				ValidationFailed(element);
			else if (indexInErrors != -1)
				ValidationPassed(element, indexInErrors);

		}else if (element.name === 'PhoneNumber'){
			if (value == '' || value.length < 9 || isNaN(Number(value)))
				ValidationFailed(element);
			else if (indexInErrors != -1)
				ValidationPassed(element, indexInErrors);
		}
	}
	if(errors.length != 0){
		button.disabled = true;
	}
	else{
		button.disabled = false;
	}
}
function ValidationPassed(element, index){
	if(index != -1){
		var elem = element.parentNode.getElementsByClassName('contact-verification-failed')[0];
		element.parentNode.removeChild(elem);
		errors.splice(index, 1);
	}
}
function ValidationFailed(element){
	if(errors.indexOf(element) == -1){
		var errorElement = document.createElement('h3');
		errorElement.classList += 'contact-verification-failed';
		errorElement.innerHTML = '!<p>Fill This Field</p>';
		errorElement = element.parentNode.insertBefore(errorElement, element);
		console.log(errorElement);
		errorElement.addEventListener('mouseover', AdditionalTextShow);
		errors.push(element);
	}
}
function AdditionalTextShow(element){
	element = element.target.lastChild;
	console.log(element);
	element.classList.add('fade-in-up');
}
function AdditionalTextHide(element){
	element = element.target.lastChild;
	console.log(element);
	element.classList.remove('fade-in-up');
	element.style.opacity = '0'
}



function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}