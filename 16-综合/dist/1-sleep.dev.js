"use strict";

var sleep = function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
};

sleep(1000).then(function () {});