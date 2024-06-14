"use strict";

var concurrencyRequest = function concurrencyRequest(urls, maxNum) {
  return new Promise(function (resolve) {
    if (!urls.length) {
      resolve([]);
      return;
    }

    var results = [];
    var current = 0; // 下一个请求的下标

    var completed = 0; // 当前请求完成的数量

    var total = urls.length; // 发送请求

    var request = function request() {
      var progress = current;
      current++;

      if (progress >= total) {
        return;
      }

      fetch(urls[progress]).then(function (res) {
        results[progress] = res;
      })["catch"](function (e) {
        results[progress] = e;
      })["finally"](function () {
        completed++;

        if (completed >= total) {
          resolve(results);
          return;
        }

        request();
      });
    };

    var times = Math.min(maxNum, urls.length); // 开启第一次批量调用

    while (current < times) {
      request();
    }
  });
};