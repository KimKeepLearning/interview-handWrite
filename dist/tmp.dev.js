"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LRU =
/*#__PURE__*/
function () {
  function LRU(size) {
    _classCallCheck(this, LRU);

    this.size = size;
    this.data = new Map();
  }

  _createClass(LRU, [{
    key: "set",
    value: function set(key, value) {
      var data = this.data,
          size = this.size;

      if (data.has(key)) {
        data["delete"](key);
      }

      data.set(key, value);

      if (data.size > size) {
        var delKey = data.keys().next().value;
        data["delete"](delKey);
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this.data.has(key)) {
        return null;
      }

      var value = this.data.get(key);
      this.data.set(key, value);
      return value;
    }
  }]);

  return LRU;
}();

var setTimeOutMy = function setTimeOutMy(func, wait) {
  var timer = null;
  timer = setInterval(function () {
    clearInterval(timer);
    func();
  }, wait);
};

var setIntervalMy = function setIntervalMy(func, wait) {
  var timer = null;

  function interval() {
    func();
    timer = setTimeOutMy(interval, wait);
  }

  timer = setTimeOutMy(interval, wait);
  return {
    clear: function clear() {
      return clearTimeout(timer);
    }
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
      if (!this.events.eventName) {
        this.events.eventName = [];
      }

      this.events[eventName].push(callback);
    }
  }, {
    key: "off",
    value: function off(eventName, cb) {
      this.events[eventName] = this.events[eventName].filter(function (event) {
        return event !== cb && event.init !== cb;
      });
    }
  }, {
    key: "once",
    value: function once(eventName, cb) {
      function one() {
        cb();
        this.off(eventName, one);
      }

      one.init = cb;
      this.on(eventName, cb);
    }
  }]);

  return EventEmitter;
}();

var createSingleton = function () {
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

var strategies = {
  straA: function straA() {
    return {
      color: 'red',
      bgColor: 'yellow'
    };
  },
  straB: function straB() {
    return {
      color: 'red',
      bgColor: 'yellow'
    };
  }
};
strategies[straA]();

var Subject =
/*#__PURE__*/
function () {
  function Subject(name) {
    _classCallCheck(this, Subject);

    this.name = name;
    this.obs = [];
  }

  _createClass(Subject, [{
    key: "observe",
    value: function observe(o) {
      this.obs.push(o);
    }
  }, {
    key: "notice",
    value: function notice() {
      var _this = this;

      this.obs.forEach(function (observer) {
        observer.receive(_this);
      });
    }
  }]);

  return Subject;
}();

var Observer =
/*#__PURE__*/
function () {
  function Observer(name) {
    _classCallCheck(this, Observer);

    this.name = name;
  }

  _createClass(Observer, [{
    key: "receive",
    value: function receive(subject) {}
  }]);

  return Observer;
}();

var pipe = function pipe(funcs) {
  return funcs.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
};

var curry = function curry(func) {
  var preArgs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var arity = func.length;
  return function () {
    for (var _len = arguments.length, nextArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      nextArgs[_key] = arguments[_key];
    }

    var args = [].concat(_toConsumableArray(preArgs), nextArgs);

    if (args.length === arity) {
      return func.apply(void 0, _toConsumableArray(args));
    }

    return curry(func, args);
  };
};

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {});
};

var sleep = function sleep(wait) {
  return new Promise(function (resolve, reject) {
    setTimeOut(function () {
      resolve();
    }, wait);
  });
};

var requestPools = function requestPools(urls) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var completed = 0;
  var progress = 0;
  var res = [];

  var request = function request() {
    var i = progress;
    progress++;

    if (i > urls.length) {
      return;
    }

    fetch(urls[i]).then(function (val) {
      res[i] = val;
    })["catch"](function (e) {
      res[i] = e;
    })["finally"](function () {
      completed++;

      if (completed === urls.length) {
        resolve(res);
        return;
      }

      request();
    });
  };

  while (progress < Math.min(urls.length, max)) {
    request();
  }
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


var light = function light(func, time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      func();
      resolve();
    }, time);
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
/**
 * 2024-6-18
 * - 并发限制
 */

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