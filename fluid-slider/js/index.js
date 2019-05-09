const slider = document.querySelector('#slider');
const sliderParent = slider.parentNode;
const currentLabel = document.querySelector('#currentLabel');
const content = document.querySelector('#content');
const contentList = document.querySelector('.tab_content');
let _mouseDown = false;
let _index = 0;

// Get position relatives to it's parent node
const getPosition = (ev, p) => {
  const rect = p.getBoundingClientRect();
  const e = ev.touches ? ev.touches[0] : ev;
  const x = e.clientX - rect.left; // x position within the element.
  const y = e.clientY - rect.top; // y position within the element.
  return { x, y };
};

// Just like replace() but it search all the match string, instead of only one
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

onMouse = (state, event) => {
  let className = slider.className;
  const onTouchClassName = " fluid_slider--label-slider-on_touch";
  switch (state) {
    // Reset the drag state
    case 'up':
      _mouseDown = false;
      slider.className = className.replaceAll(onTouchClassName, '');
      slider.style.transition = 'left 200ms ease, height 200ms ease';
      content.innerHTML = contentList.children[_index].innerHTML;
      content.style.opacity = 1;
      break;

    // Mark the state is ready to drag
    case 'down':
      const positionD = getPosition(event, sliderParent);
      if (positionD.x > 0 && positionD.x < sliderParent.offsetWidth) {
        slider.className = className + onTouchClassName;
        _mouseDown = true;
        content.style.opacity = 0;
        if (positionD.x > 25.5 && positionD.x < sliderParent.offsetWidth - 25.5) {
          slider.style.left = positionD.x + 'px';
        }
      }
      break;

    // Start to drag when the state is ready to drag
    case 'move':
      if (_mouseDown) {
        const positionM = getPosition(event, sliderParent);

        // Force the drag event off if it is out of boundary
        if (positionM.x < 25 || positionM.x > sliderParent.offsetWidth - 25 || positionM.y <= 0 || positionM.y >= 50) {
          _mouseDown = false;
          slider.className = className.replaceAll(onTouchClassName, '');
          slider.style.transition = 'left 200ms ease, height 200ms ease';
        } else {
          slider.style.left = positionM.x + 'px';
          slider.style.transition = 'height 200ms ease';
          _index = Math.round(positionM.x / sliderParent.offsetWidth * 20); // Calculate the index
          currentLabel.innerHTML = _index;
        }
      }
      break;

    // In case the drag event out of boundary, reset the state to not ready to drag (still doesn't working I think)
    case 'leave':
      slider.className = className.replaceAll(onTouchClassName, '');
      _mouseDown = false;
      slider.style.transition = 'left 200ms ease, height 200ms ease';
      content.innerHTML = contentList.children[_index].innerHTML;
      content.style.opacity = 1;
      break;
    default:
      break;}

};