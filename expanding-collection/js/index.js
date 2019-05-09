const content = document.querySelector('#content');
const wrapper = document.querySelector('#wrapper');
const contentIndex = document.querySelector('#index');
let _index = 0;
let _viewState = 'CARD'; // enum of 'CARD', 'BOX', 'FULL'
let _isFull = false;
let _content = content.children[_index];
let _image = _content.children[0];
let _box = _content.children[1];
let _full = _content.children[2];
let _commentList = _full.children[0];
let _closeButton = _image.children[3];

// Just like replace() but it search all the match string, instead of only one
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

// Get position relatives to your desired node
const getPosition = (ev, p) => {
  const rect = p.getBoundingClientRect();
  const e = ev.touches ? ev.touches[0] : ev;
  const x = e.clientX - rect.left; // x position within the element.
  const y = e.clientY - rect.top; // y position within the element.
  return { x, y };
};

setIndex = (index, callback, e) => {
  // console.log('setindex dong')
  e.stopPropagation();
  const activeClassName = ' expand_collection--content-active';

  if (index !== _index) {
    for (let i = 0; i < content.children.length; i++) {
      let currentClassName = content.children[i].className;
      if (i === index) {
        content.children[i].className = currentClassName + activeClassName;
        if (_viewState === 'BOX') toggleViewState(e, _index);
      } else {
        content.children[i].className = currentClassName.replaceAll(activeClassName, '');
      }
    }
    _index = index;
    contentIndex.innerHTML = _index + 1 + '/4';
  }

  if (callback) {
    callback(e, index);
  }


};

toggleFullState = e => {
  e.stopPropagation();
  const fullActiveClassName = ' expand_collection--full-active';
  const imageFullClassName = ' expand_collection--image-state_full';
  const boxFullClassName = ' expand_collection--box-state_full';
  const contentStateFullClassName = ' expand_collection--content-state_full';
  const closeActiveClassName = ' close_button-active';
  if (_isFull) {
    _isFull = false;
    _full.className = _full.className.replaceAll(fullActiveClassName, '');
    _box.className = _box.className.replaceAll(boxFullClassName, '');
    _image.className = _image.className.replaceAll(imageFullClassName, '');
    _content.className = _content.className.replaceAll(contentStateFullClassName, '');
    _closeButton.className = _closeButton.className.replaceAll(closeActiveClassName, '');
    onAnimation(_closeButton);
  } else {
    _isFull = true;
    _full.className += fullActiveClassName;
    _box.className += boxFullClassName;
    _image.className += imageFullClassName;
    _content.className += contentStateFullClassName;
    _closeButton.className += closeActiveClassName;

    _commentList.scrollTop = '0px';

    onAnimation(_closeButton);
  }
  console.log('go to FULL');
};

toggleViewState = (e, i) => {
  e.stopPropagation();
  const imageActiveClassName = ' expand_collection--image-active';
  const boxActiveClassName = ' expand_collection--box-active';
  const contentStateCardClassName = ' expand_collection--content-state_card';

  _content = content.children[i];
  _image = _content.children[0];
  _box = _content.children[1];
  _full = _content.children[2];
  _commentList = _full.children[0];
  _closeButton = _image.children[3];

  if (!_isFull) {
    switch (_viewState) {
      case 'BOX':
        _viewState = 'CARD';
        _box.className = _box.className.replaceAll(boxActiveClassName, '');
        _image.className = _image.className.replaceAll(imageActiveClassName, '');
        _content.className = _content.className.replaceAll(contentStateCardClassName, '');

        // Used for make siblings card moving apart when the state changed to card
        content.style.marginLeft = Number(content.style.marginLeft.replace('px', '')) + 20 + 'px';
        break;
      case 'CARD':
        _viewState = 'BOX';
        _box.className += boxActiveClassName;
        _image.className += imageActiveClassName;
        _content.className += contentStateCardClassName;

        // Used for make siblings card moving closer again when the state changed back into box
        content.style.marginLeft = Number(content.style.marginLeft.replace('px', '')) - 20 + 'px';
        break;
      default:
        break;}

  }
};

// Used to prevent another touch during animation
onAnimation = element => {
  element.className += ' animating';
  setTimeout(() => {
    element.className = element.className.replaceAll(' animating', '');
  }, 501);
};

moveTo = e => {
  const distance = 220;
  const position = getPosition(e, wrapper);
  const width = wrapper.clientWidth;
  const direction = position.x <= width / 2 ? 'LEFT' : 'RIGHT';
  const parentOffset = wrapper.getBoundingClientRect();
  const contentOffset = content.getBoundingClientRect();
  const left = contentOffset.left - parentOffset.left;
  const right = parentOffset.right - contentOffset.right;
  let currentMarginLeft = Number(content.style.marginLeft.replace('px', ''));

  if (!_isFull) {
    if (direction === 'LEFT') {
      if (left > -218 ? right > 9 : right <= 9) {
        onAnimation(wrapper);
        content.style.marginLeft = currentMarginLeft + distance + 'px';
        setIndex(_index - 1, null, e);
      }
    } else {
      if (right < 8) {
        onAnimation(wrapper);
        content.style.marginLeft = currentMarginLeft - distance + 'px';
        setIndex(_index + 1, null, e);
      }
    }
  }
};

// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml; https://codepen.io/ganmahmud/pen/RaoKZa
function swipedetect(el, callback) {

  var touchsurface = el,
  swipedir,
  startX,
  startY,
  distX,
  distY,
  threshold = 150, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 300, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handleswipe = callback || function (swipedir) {};

  touchsurface.addEventListener('touchstart', function (e) {
    var touchobj = e.changedTouches[0];
    swipedir = 'none';
    dist = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // record time when finger first makes contact with surface
    e.preventDefault();
  }, false);

  touchsurface.addEventListener('touchmove', function (e) {
    e.preventDefault(); // prevent scrolling when inside DIV
  }, false);

  touchsurface.addEventListener('touchend', function (e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
    elapsedTime = new Date().getTime() - startTime; // get time elapsed
    if (elapsedTime <= allowedTime) {// first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {// 2nd condition for horizontal swipe met
        swipedir = distX < 0 ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
      } else
      if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {// 2nd condition for vertical swipe met
        swipedir = distY < 0 ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
      }
    }
    handleswipe(swipedir);
    e.preventDefault();
  }, false);
}

// swipedetect(wrapper, function(swipedir){
//   // swipedir contains either "none", "left", "right", "top", or "down"
//   console.log('detect', swipedir)
// })