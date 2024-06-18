class LRU {
  constructor(size) {
    this.size = size;
    this.data = new Map();
  }
  set(key, value) {
    const { data, size } = this;
    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);
    if (data.size > size) {
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }
  get(key) {
    if (!this.data.has(key)) {
      return null;
    }
    const value = this.data.get(key);
    this.data.set(key, value);
    return value;
  }
}

const setTimeOutMy = (func, wait) => {
  let timer = null;
  timer = setInterval(() => {
    clearInterval(timer);
    func();
  }, wait)
}
const setIntervalMy = (func, wait) => {
  let timer = null;
  function interval() {
    func();
    timer = setTimeOutMy(interval, wait)
  }
  timer = setTimeOutMy(interval, wait)
  return {
    clear: () => clearTimeout(timer)
  }
}

class EventEmitter {
  constructor() {
    this.events = {};
  } 
  on(eventName, callback) {
    if (!this.events.eventName) {
      this.events.eventName = []
    }
    this.events[eventName].push(callback)
  }
  off(eventName, cb) {
    this.events[eventName] = this.events[eventName].filter(event => event !== cb && event.init !== cb)
  }
  once(eventName, cb) {
    function one() {
      cb();
      this.off(eventName, one);
    }
    one.init = cb;
    this.on(eventName, cb);
  }
}

const createSingleton = (function () {
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

const strategies = {
  straA() {
    return {
      color: 'red',
      bgColor: 'yellow',
    }
  },
  straB() {
    return {
      color: 'red',
      bgColor: 'yellow',
    }
  }
}
strategies[straA]()

class Subject {
  constructor(name) {
    this.name = name;
    this.obs = [];
  }
  observe(o) {
    this.obs.push(o)
  }
  notice() {
    this.obs.forEach(observer => {
      observer.receive(this);
    })
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  receive(subject) {
  }
}

const pipe = (funcs) => {
  return funcs.reduce((f, g) => (...args) => f(g(...args)));
}

const curry = (func, preArgs = []) => {
  const arity = func.length;
  return function (...nextArgs) {
    const args = [...preArgs, ...nextArgs];
    if (args.length === arity) {
      return func(...args);
    }
    return curry(func, args);
  }
}

Promise.all = (promises) => {
  return new Promise((resolve, reject) => {

  })
}

const sleep = (wait) => {
  return new Promise((resolve, reject) => {
    setTimeOut(() => {
      resolve();
    }, wait)
  })
}

const requestPools = (urls, max = 3) => {
  let completed = 0;
  let progress = 0;
  const res = []
  const request = () => {
    let i = progress;
    progress++;
    if (i > urls.length) {
      return;
    }
    fetch(urls[i]).then(val => {
      res[i] = val;
    }).catch((e) => {
      res[i] = e;
    }).finally(() => {
      completed++;
      if (completed === urls.length) {
        resolve(res);
        return;
      }
      request();
    })
  }
  while (progress < Math.min(urls.length, max)) {
    request()
  }
}

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}
 
//红灯3秒亮一次，
//黄灯2秒亮一次，
//绿灯1秒亮一次；
//如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

const light = (func, time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      func();
      resolve();
    }, time)
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
    return step();
  })
}
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




