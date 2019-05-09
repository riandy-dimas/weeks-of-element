var length = 50;
var tl = new TimelineMax({repeat: -1})
  .to("#circle-loader", 1, {bottom: length/2, ease: "Circ"})
  .to("#circle-loader", 1, {left: length/2, ease: "Circ"})
  .to("#circle-loader", 1, {bottom: -1 * length/2, ease: "Circ"})
  .to("#circle-loader", 1, {left: -1 * length/2, ease: "Circ"});