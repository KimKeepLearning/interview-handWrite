"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var setIntervalMy = function setIntervalMy(func, wait) {
  var timer = undefined;

  function interval() {
    func();
    timer = setTimeoutMy(interval, wait);
  }

  timer = setTimeoutMy(interval, wait);
  return {
    clear: function clear() {
      return clearTimeout(timer);
    }
  };
};

var setTimeoutMy = function setTimeoutMy(func, wait) {
  var timer = undefined;
  timer = setInterval(function () {
    if (timer) {
      clearInterval(timer);
    }

    func();
  }, wait);
};

var create = function create(proto) {
  function fn() {}

  ;
  fn.prototype = proto;
  return new fn();
};

var freeze = function freeze(obj) {
  if (_typeof(obj) !== 'object' || obj === null) {
    return obj;
  }

  Object.seal(obj);

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false
      });
      freeze(obj[key]);
    }
  }
};

Array.prototype.reduceMy = function (cb, initvalue) {
  var self = this;
  var res = initvalue ? initvalue : self[0];
  var start = initvalue ? 0 : 1;

  for (var i = start; i < self.length; i++) {
    res = cb(res, self[i], i, self);
  }

  return res;
};

Array.prototype.myMap = function (cb, thisArgs) {
  var self = this;
  var res = [];

  for (var i = 0; i < self.length; i++) {
    res[i] = cb.call(thisArgs, self[i], i, self);
  }

  return res;
};

var flat = function flat(arr) {
  return arr.reduce(function (prev, cur) {
    return prev.concat(Array.isArray(cur) ? flat(cur) : cur);
  });
};

Array.myOf = function () {
  return [].slice.call(arguments);
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
      func.apply(void 0, _toConsumableArray(args));
    } else {
      curry(func, args);
    }
  };
};

var compose = function compose() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  return funcs.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
};

Promise.allMy = function (promises) {
  return new Promise(function (resolve, reject) {
    var res = [];

    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function (v) {
        res.push(v);

        if (res.length === promises.length) {
          resolve(res);
        }
      })["catch"](function (e) {
        reject(e);
      });
    }
  });
};

var Promise =
/*#__PURE__*/
function () {
  function Promise() {
    _classCallCheck(this, Promise);
  }

  _createClass(Promise, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) {
        return v;
      };

      if (this.status === 'pending') {
        this.success.push(resolveNewPromise);
      }

      if (this.status === 'onFulfilled') {
        resolveNewPromise(this.value);
      }

      var resolveNewPromise = function resolveNewPromise(value) {
        return new Promise(function (reoslveNext, rejectNext) {
          try {
            var res = onFulfilled(value);

            if (res instanceof Promise) {
              res.then(reoslveNext, rejectNext);
            } else {
              reoslveNext(res);
            }
          } catch (e) {
            rejectNext(e);
          }
        });
      };
    }
  }]);

  return Promise;
}();

Function.prototype.bind = function (context) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  var self = this;

  var fBound = function fBound() {
    for (var _len4 = arguments.length, innerArgs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      innerArgs[_key4] = arguments[_key4];
    }

    return self.apply(this instanceof fBound ? this : context, args.concat(innerArgs));
  };

  fBound.prototype = Object.create(this.prototype);
  return fBound;
};
/**
 * 2024-6-4:  4, 5, 7 -------接近2h
 */

/**
 * 2024-6-5: 
 *  8.1-resolve， 8.3-finally, 8.4-all 8.6-race
 *  4
 */

/**
 * 2024-6-6:
 * 8. 完整的promise
 * 5. bind
 */

/**
 * 2024-6-7:
 * 15: setInterval
 * 13: Object.freeze
 * 10: curry
 * 8: then
 */