"use strict";

var _this2 = void 0;

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ajax = function ajax(url, method, paramString) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {//
      }
    }
  };

  xhr.send(paramString);
};

var ajaxPromise = function ajaxPromise(url, method, paramString) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject('fail');
        }
      }
    };

    xhr.send(paramString);
  });
};

Promise.myResolve = function (param) {
  if (param instanceof Promise) {
    return param;
  }

  return new Promise(function (resolve, reject) {
    if (_typeof(param) !== 'object') {
      resolve(param);
    }

    if (param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    }
  });
};

Promise.reject = function (params) {
  return new Promise(function (resolve, reject) {
    reject(param);
  });
}; // 在promise结束时，无论结果是FULFILLED或者是rejected，都会执行回调函数


Promise["finally"] = function (cb) {
  // this指向当前Promise实例
  return this.then(function (res) {
    return Promise.resolve(cb()).then(function () {
      return res;
    });
  }, function (err) {
    return Promise.resolve(cb()).then(function () {
      return err;
    });
  });
};

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var len = promises.length;
    var resArr = [];

    for (var i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(function (res) {
        resArr.push(res);

        if (resArr.length === len) {
          resolve(resArr);
        }
      })["catch"](function (err) {
        reject(err);
      });
    }
  });
};

Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(function (res) {
        resolve(res);
        return;
      })["catch"](function (err) {
        reject(err);
        return;
      });
    }
  });
};

Promise.allSettled = function (promises) {
  return new Promise(function (resolve, reject) {
    var len = promises.length;
    var resArr = [];

    var checkIsEnd = function checkIsEnd() {
      if (resArr.length === len) {
        resolve(resArr);
      }
    };

    for (var i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(function (res) {
        resArr.push({
          state: 'fulfilled',
          value: res
        });
        checkIsEnd();
      }, function (err) {
        resArr.push({
          state: 'rejected',
          value: err
        });
        checkIsEnd();
      });
    }
  });
};

var Status = {
  Pending: "PENDING",
  Fulfilled: "FULFILLED",
  Rejected: "REJECTED"
};

var MyPromise =
/*#__PURE__*/
function () {
  function MyPromise(handler) {
    _classCallCheck(this, MyPromise);

    this.status = Status.Pending;
    this.value = undefined;
    this.successCallback = [];
    this.failedCallback = [];

    try {
      handler(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  _createClass(MyPromise, [{
    key: "resolve",
    value: function resolve(res) {
      if (this.status === Status.Pending) {
        this.status = Status.Fulfilled;
        this.value = res;
        this.successCallback.forEach(function (func) {
          func(res);
        });
      }
    }
  }, {
    key: "reject",
    value: function reject(err) {
      if (this.status === Status.Pending) {
        this.status = Status.Rejected;
        this.value = err;
        this.failedCallback.forEach(function (func) {
          func(err);
        });
      }
    }
  }, {
    key: "then",
    value: function then(onFulfilled, onRejected) {
      var _this = this;

      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) {
        return v;
      };
      onRejected = typeof onFulfilled === 'function' ? onFulfilled : function (r) {
        throw r;
      };
      var value = this.value,
          status = this.status;
      return new Promise(function (resolveNext, rejectNext) {
        if (status === Status.Pending) {
          _this.failedCallback.push(resolveNewPromise);

          _this.successCallback.push(rejectNewPromise);
        }

        if (status === Status.Fulfilled) {
          resolveNewPromise(value);
        }

        if (status === Status.Rejected) {
          rejectNewPromise(value);
        } // 前一个promise成功时执行的函数


        var resolveNewPromise = function resolveNewPromise(value) {
          try {
            var result = onFulfilled(value); //承前

            result instanceof Promise ? result.then(resolveNext, rejectNext) : resolveNext(value); // 启后
          } catch (e) {
            rejectNext(e);
          }
        };

        var rejectNewPromise = function rejectNewPromise(reason) {};
      });
    }
  }]);

  return MyPromise;
}();

function Parent() {}

function Child() {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var deepClone = function deepClone(target) {
  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();

  if (!isObject(target)) {
    return target;
  }

  var type = getType(target);
  var newtarget = null;

  if (map.get(tagret)) {
    return target;
  }

  map.set(target, true);

  if (type === setTag) {
    target.forEach(function (item) {
      newtarget.add(deepClone(item, map));
    });
  }

  if (type === mapTag) {
    target.forEach(function (item, key) {
      newtarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      newtarget[prop] = deepClone(target[prop], map);
    }
  }

  return newtarget;
};

var handleCloneFunction = function handleCloneFunction(func) {
  if (!func.prototype) {
    return func; // 而箭头函数不是任何类的实例，每次调用都是不一样的引用
  }

  var funcString = func.toString();
  var paramReg = /(?<=\s*\().+(?=\)\s+\{)/;
  var bodyReg = /(?<=\{)(.|\n|\r)+(?=\})/m;
  var params = paramReg.exec(funcString);
  var body = bodyReg.exec(funcString);

  if (!body) {
    return function () {};
  }

  if (params) {
    var paramsArr = params[0].split(',');
    return _construct(Function, _toConsumableArray(paramsArr).concat([body[0]]));
  }

  return new Function(body[0]);
};

Function.prototype.myCall = function () {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var key = Symbol();
  context[key] = _this2;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var res = context[key].apply(context, args);
  delete context[key];
  return res;
};

Function.prototype.myBind = function () {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var self = this;

  var fBound = function fBound() {
    for (var _len3 = arguments.length, innerArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      innerArgs[_key3] = arguments[_key3];
    }

    return self.apply(this instanceof fBound ? this : context, args.concat(innerArgs));
  };

  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

function mynew(constructor) {
  var newObj = Object.create(constructor.prototype);

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var res = constructor.apply.apply(constructor, [newObj].concat(args));
  return _typeof(res) === 'object' ? res : newObj;
}
/**
 * 2024-6-4:  4, 5, 7 -------接近2h
 */

/**
 * 2024-6-5: 
 *  8.1-resolve， 8.3-finally, 8.4-all 8.6-race
 *  4
 */


var curry = function curry(func) {
  var prevArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var len = func.length;
  return function () {
    for (var _len5 = arguments.length, nextArgs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      nextArgs[_key5] = arguments[_key5];
    }

    var curArgs = [].concat(_toConsumableArray(prevArgs), [nextArgs]);

    if (curArgs.length === len) {
      return func.apply(void 0, _toConsumableArray(curArgs));
    }

    return curry(func, curArgs);
  };
};