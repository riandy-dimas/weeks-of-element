var tl = new TimelineMax({repeat:-1});
var transitionSpeed = 0.4;
var delaySpeed = "+=0.8";

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#subway", type: "rotational"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#car", type: "linear"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#train", type: "linear"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#truck", type: "rotational"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#boat", type: "linear"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#tram", type: "linear"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#motor", type: "rotational"}, ease: Circ.easeOut}, delaySpeed);

tl.to("#plane", transitionSpeed, {morphSVG: {shape: "#plane", type: "linear"}, ease: Circ.easeOut}, delaySpeed);