"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var setTimeoutMy = function setTimeoutMy(func, wait) {
  var timer = undefined;
  timer = setInterval(function () {
    clearInterval(timer);
    func();
  }, wait);
};

var setIntervalMy = function setIntervalMy(func, wait) {
  var timer = undefined;

  function interval() {
    func();
    timer = setTimeout(interval, wait);
  }

  timer = setTimeout(interval, wait);
  return {
    clear: clearTimeout(timer)
  };
};

Object.freezeMy = function (obj) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return;
  }

  Object.seal(obj);

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false
      });
      freezeMy(obj[key]);
    }
  }
};

var curry = function curry(func) {
  var prevArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var arity = func.length;
  return function () {
    for (var _len = arguments.length, nextArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      nextArgs[_key] = arguments[_key];
    }

    var args = [].concat(_toConsumableArray(prevArgs), nextArgs);

    if (args.length === arity) {
      return func.apply(void 0, _toConsumableArray(args));
    }

    return curry(func, args);
  };
};

var PromiseMy =
/*#__PURE__*/
function () {
  function PromiseMy(handler) {
    _classCallCheck(this, PromiseMy);

    this.value = undefined;
    this.successCb = [];
    this.failCb = [];
  }

  _createClass(PromiseMy, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      var _this = this;

      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) {
        return v;
      };
      return new Promise(function (resolveNext, rejectNext) {
        if (_this.status === 'pending') {
          _this.successCb.push(reoslveNewPromise);
        }

        if (_this.status === 'onFulfilled') {
          reoslveNewPromise(_this.value);
        }

        var reoslveNewPromise = function reoslveNewPromise(value) {
          try {
            var res = onFulfilled(value);

            if (res instanceof Promise) {
              res.then(resolveNext, rejectNext);
            } else {
              resolveNext(res);
            }
          } catch (error) {
            rejectNext(error);
          }
        };
      });
    }
  }]);

  return PromiseMy;
}();

var myNew = function myNew(constructor) {
  var newObj = Object.create(constructor.prototype);

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var res = constructor.apply(newObj, args);
  return _typeof(res) === 'object' ? res : newObj;
};
/**
 * 2024-6-8:
 * √
 */

/**
 * 2024-6-7:
 * 15: setInterval
 * 13: Object.freeze
 * 10: curry
 * 8: then
 */

/**
 * 2024-6-6:
 * 8. 完整的promise
 * 5. bind
 */

/**
 * 2024-6-5: 
 *  8.1-resolve， 8.3-finally, 8.4-all 8.6-race
 *  4
 */

/**
 * 2024-6-4:  4, 5, 7 -------接近2h
 */