const dongleOn = document.querySelector(".switch--dongle-on");
const dongleOff = document.querySelector(".switch--dongle-off");
const bgOn = document.querySelector(".switch--background-on");
const bgOff = document.querySelector(".switch--background-off");
let isOn = false;
const speed = 0.5;
var tlOn = new TimelineMax();
var tlOff = new TimelineMax();
  
function doSwitch () {
  isOn = !isOn;
  if (isOn) {
    tlOn.to(".switch--dongle-on", speed, { top: "-100%", ease: Power4.easeOut })
      .to(".switch--background-on", speed, { top: "-100%", ease: Power2.easeOut }, `-=${speed}`)
      .to(".switch--dot__on", speed, { bottom: "95%", ease: Power0.easeOut }, `-=${speed}`);
    
    
    tlOff.to(".switch--dongle-off", speed, { top: "0", ease: Power4.easeOut })
      .to(".switch--background-off", speed, { top: "0", ease: Power2.easeOut  }, `-=${speed}`)
      .to(".switch--dot__off", speed, { top: "5%", ease: Power0.easeOut }, `-=${speed}`);

  } else {
    tlOn.to(".switch--dongle-on", speed, { top: "0", ease: Power4.easeOut })
      .to(".switch--background-on", speed, { top: "0", ease: Bounce.easeOut }, `-=${speed}`)
      .to(".switch--dot__on", speed, { bottom: "5%", ease: Bounce.easeOut }, `-=${speed}`);
    
    
    tlOff.to(".switch--dongle-off", speed, { top: "100%", ease: Power4.easeOut })
      .to(".switch--background-off", speed, { top: "100%", ease: Bounce.easeOut }, `-=${speed}`)
      .to(".switch--dot__off", speed, { top: "95%", ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 0.5, points: 10, taper: "both", randomize:  false, clamp: false}) }, `-=${speed}`);
  }
}