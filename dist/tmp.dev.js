"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LRUCache =
/*#__PURE__*/
function () {
  function LRUCache(limit) {
    _classCallCheck(this, LRUCache);

    this.limit = limit;
    this.data = new Map();
  }

  _createClass(LRUCache, [{
    key: "set",
    value: function set(key, value) {
      var limit = this.limit,
          data = this.data;

      if (data.get(key)) {
        data["delete"](key);
      }

      data.set(key, value);

      if (data.size > limit) {
        var delVal = data.keys().next().value;
        data["delete"](delVal);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      var data = this.data;

      if (!data.has(key)) {
        return null;
      }

      var val = data.get(key);
      data["delete"](key);
      data.set(key, val);
      return val;
    }
  }]);

  return LRUCache;
}();

var setTimeOut = function setTimeOut(func, wait) {
  var timer = 0;
  timer = setInterval(function () {
    clearInterval(timer);
    func();
  }, wait);
};

var setInterval = function setInterval(func, wait) {
  var timer = 0;

  function interval() {
    func();
    timer = setTimeout(interval, wait);
  }

  timer = setTimeout(interval, wait);
  return {
    clear: clearTimeout(timer)
  };
};

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push(callback);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.events[eventName].forEach(function (func) {
        return func.apply(void 0, args);
      });
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      this.events[eventName] = this.events[eventName].filter(function (func) {
        return func != callback && func.init != callback;
      });
    }
  }, {
    key: "once",
    value: function once(eventName, callback) {
      function one() {
        callback();
        this.off(eventName, one);
      }

      one.init = callback;
      this.on(eventName, one);
    }
  }]);

  return EventEmitter;
}();

var Subject =
/*#__PURE__*/
function () {
  function Subject(name) {
    _classCallCheck(this, Subject);

    this.name = name;
    this.ob = [];
  }

  _createClass(Subject, [{
    key: "attach",
    value: function attach(ob) {
      this.ob.push(ob);
    }
  }, {
    key: "changeState",
    value: function changeState(name) {
      var _this = this;

      this.name = name;
      this.ob.forEach(function (obj) {
        return obj.update(_this);
      });
    }
  }]);

  return Subject;
}();

var createSingleton = function () {
  var instance;
  return function (name) {
    if (instance) {
      return instance;
    }

    this.name = name;
    instance = this;
    return instance;
  };
}();

var strategies = {
  straA: function straA() {
    return {
      text: '',
      bg: '',
      color: ''
    };
  },
  straB: function straB() {
    return {
      text: '',
      bg: '',
      color: ''
    };
  },
  straC: function straC() {
    return {
      text: '',
      bg: '',
      color: ''
    };
  }
};
strategies[straA]();

var createSingleton1 = function () {
  var instance = null;
  return function (name) {
    if (instance) {
      return instance;
    }

    this.name = name;
    instance = this;
    return instance;
  };
}();

var curry = function curry(func) {
  var preArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var arity = func.length;
  return function () {
    for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nextArgs[_key2] = arguments[_key2];
    }

    var args = [].concat(_toConsumableArray(preArgs), nextArgs);

    if (args.length === arity) {
      return func.apply(void 0, _toConsumableArray(args));
    }

    return curry(func, args);
  };
};

var lazyLoad = function lazyLoad() {
  var imgs = document.querySelectorAll('img');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = imgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
};

var isVisible = function isVisible(node) {
  var windowHeight = document.documentElement.clientHeight;
  var box = node.getBoundingClientRect();
  var top = box.top,
      bottom = box.bottom;
  var topVisible = top > 0 && top < windowHeight;
  var bottomVis = bottom > 0 && bottom < windowHeight;
  return topVisible || bottomVis;
};

function red() {
  console.log('red');
}

function green() {
  console.log('green');
}

function yellow() {
  console.log('yellow');
} //红灯3秒亮一次，
//黄灯2秒亮一次，
//绿灯1秒亮一次；
//如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：


var light = function light(func, wait) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
      func();
    }, wait);
  });
};

var step = function step() {
  Promise.resolve().then(function () {
    return light(red, 3000);
  }).then(function () {
    return light(green, 2000);
  }).then(function () {
    return light(yellow, 1000);
  }).then(function () {
    return step();
  });
};

step();

var sleep = function sleep(time) {
  return new Promise(function (reoslve) {
    setTimeOut(function () {
      resolve();
    }, time);
  });
};

var PromiseQueue =
/*#__PURE__*/
function () {
  function PromiseQueue(limit) {
    _classCallCheck(this, PromiseQueue);

    this.limit = limit;
    this.queue = [];
    this.runCounts = 0;
  }

  _createClass(PromiseQueue, [{
    key: "add",
    value: function add(time, order) {
      var createPromise = function createPromise() {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            console.log(order);
            resolve();
          }, time);
        });
      };

      this.queue.push(createPromise);
    }
  }, {
    key: "run",
    value: function run() {
      for (var i = 0; i < this.limit; i++) {
        this.request();
      }
    }
  }, {
    key: "request",
    value: function request() {
      var _this2 = this;

      if (!this.queue.length || this.runCounts > this.limit) {
        return;
      }

      this.queue.shift()().then(function () {
        _this2.runCounts--;

        _this2.request();
      });
    }
  }]);

  return PromiseQueue;
}();

var concurrencyRequest = function concurrencyRequest(urls, max) {
  return new Promise(function (resolve, reject) {
    var total = urls.length;
    var res = [];
    var completed = 0;
    var current = 0;

    if (!total) {
      resolve([]);
      return;
    }

    var request = function request() {
      var i = current;
      current++;

      if (i >= total) {
        return;
      }

      fetch(urls[i]).then(function (val) {
        res[i] = val;
      })["catch"](function (err) {
        res[i] = err;
      })["finally"](function () {
        completed++;

        if (completed >= total) {
          resolve(res);
          return;
        }

        request();
      });
    };

    var times = Math.min(total, max);

    while (current < times) {
      request();
    }
  });
};
/**
 * 2024-6-13
 * 单例模式
 * 红绿灯
 * 并发限制的调度器
 * Promise.all, allsettled重搞下
 */

/**
 * 2024-6-11
 * 8.promise：内部resolve方法
 * 6.正向预查和反向预查
 * 2. throttle
 */

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