"use strict";

// 使用Promise实现每隔1秒输出1,2,3
var arr = [1, 2, 3];
arr.reduce(function (prev, next) {
  return prev.then(function () {
    return new Promise(function (reoslve) {
      return setTimeout(function () {
        return reoslve(next, console.log(next));
      }, 1000);
    });
  });
}, Promise.resolve());