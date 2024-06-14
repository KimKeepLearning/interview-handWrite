const creatSingleton = (function () {
  let instance = null;
  return function (name) {
    if (instance) {
      return instance;
    }
    this.name = name;
    instance = this;
    return instance;
  }
})()

const light = (func, wait) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      func();
      resolve();
     }, wait);
  })
}
const step = () => {
  Promise.resolve().then(() => {
    return light(red, 3000);
  }).then(() => {
    return light(green, 2000);
  }).then(() => {
    return light(yellow, 1000);
  }).then(() => {
    step();
  })
}
step();
Promise.resolveMy = (param) => {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if (param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    } else {
      resolve(param)
    }
  })
}

Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    const res = [];
    let completed = 0;
    if (!res.length) {
      resolve(res);
      return;
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(val => {
        res[i] = val;
        completed++;
        if (completed === len) {
          resolve(res);
        }
      }).catch(e => {
        reject(e);
      })
    }
  })
}

const concurrencyPromise = (urls, max) => {
  return new Promise((resolve, reject) => {
    const len = urls.length;
    let completed = 0;
    let current = 0
    const res = [];
    if (!len) {
      resolve(res);
      return;
    }
   
    const request = () => {
      let i = current;
      current++;
      if (i >= len) {
        return;
      }
      fetch(urls[i]).then(val => {
        res[i] = val;
      }).catch(err => {
        res[i] = err;
      }).finally(() => {
        completed++;
        if (completed >= len) {
          resolve(res);
          return;
        }
        request();
      })
    }
    while (current <= Math.min(max, urls.length)) {
      request()
    }
  })
}


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




