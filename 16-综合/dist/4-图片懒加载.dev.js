"use strict";

function lazyload() {
  var images = document.querySelectorAll('img');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var img = _step.value;
      var src = img.dataset.src;

      if (!src) {
        continue;
      }

      if (isVisible(img)) {
        img.src = src;
        img.dataset.src = '';
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function isVisible(node) {
  var position = node.getBoundingClientRect();
  var windowHeight = document.documentElement.clientHeight;
  var topVisible = position.top > 0 && position.top < windowHeight;
  var bottomVisible = position.bottom > 0 && position.bottom < windowHeight;
  return topVisible || bottomVisible;
}