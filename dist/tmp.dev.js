"use strict";

var creatSingleton = function () {
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

var light = function light(func, wait) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      func();
      resolve();
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
    step();
  });
};

step();

Promise.resolveMy = function (param) {
  if (param instanceof Promise) {
    return param;
  }

  return new Promise(function (resolve, reject) {
    if (param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  });
};

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var len = promises.length;
    var res = [];
    var completed = 0;

    if (!res.length) {
      resolve(res);
      return;
    }

    var _loop = function _loop(i) {
      Promise.resolve(promises[i]).then(function (val) {
        res[i] = val;
        completed++;

        if (completed === len) {
          resolve(res);
        }
      })["catch"](function (e) {
        reject(e);
      });
    };

    for (var i = 0; i < len; i++) {
      _loop(i);
    }
  });
};

var concurrencyPromise = function concurrencyPromise(urls, max) {
  return new Promise(function (resolve, reject) {
    var len = urls.length;
    var completed = 0;
    var current = 0;
    var res = [];

    if (!len) {
      resolve(res);
      return;
    }

    var request = function request() {
      var i = current;
      current++;

      if (i >= len) {
        return;
      }

      fetch(urls[i]).then(function (val) {
        res[i] = val;
      })["catch"](function (err) {
        res[i] = err;
      })["finally"](function () {
        completed++;

        if (completed >= len) {
          resolve(res);
          return;
        }

        request();
      });
    };

    while (current <= Math.min(max, urls.length)) {
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