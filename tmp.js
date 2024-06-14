class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.data = new Map();
  }

  set(key, value) {
    const { limit, data } = this;
    if (data.get(key)) {
      data.delete(key);
    }
    data.set(key, value)
    if (data.size > limit) {
      const delVal = data.keys().next().value;
      data.delete(delVal);
    }
  }

  get(key) {
    const { data } = this;
    if (!data.has(key)) {
      return null;
    }
    const val = data.get(key);
    data.delete(key);
    data.set(key, val);
    return val;
  }

}

const setTimeOut = (func, wait) => {
  let timer = 0;
  timer = setInterval(() => {
    clearInterval(timer);
    func();
  }, wait);
}

const setInterval = (func, wait) => {
  let timer = 0;
  function interval() {
    func();
    timer = setTimeout(interval, wait);
  }
  timer = setTimeout(interval, wait);
  return {
    clear: clearTimeout(timer)
  }
}

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  emit(eventName, ...args) {
    this.events[eventName].forEach(func => func(...args))
  }
  off(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(func => func != callback && func.init != callback)
  }
  once(eventName, callback) {
    function one() {
      callback();
      this.off(eventName, one)
    }
    one.init = callback;
    this.on(eventName, one);
  }
}

class Subject{
  constructor(name) {
    this.name = name;
    this.ob = [];
  }

  attach(ob) {
    this.ob.push(ob);
  }

  changeState(name) {
    this.name = name;
    this.ob.forEach(obj => obj.update(this));
  }
}

const createSingleton = (function () {
  let instance;
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
      text: '',
      bg: '',
      color: ''
    }
  },
  straB() {
    return {
      text: '',
      bg: '',
      color: ''
    }
  },
  straC() {
    return {
      text: '',
      bg: '',
      color: ''
    }
  }
}
strategies[straA]();

const createSingleton1 = (function () {
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

const curry = (func, preArgs = []) => {
  const arity = func.length;
  return (...nextArgs) => {
    const args = [...preArgs, ...nextArgs];
    if (args.length === arity) {
      return func(...args);
    }
    return curry(func, args);
  }
}

const lazyLoad = () => {
  const imgs = document.querySelectorAll('img');
  for (let img of imgs) {
    const src = img.dataset.src;
    if (!src) {
      continue;
    }
    if (isVisible(img)) {
      img.src = src;
      img.dataset.src = ''
    }
  }
}
const isVisible = (node) => {
  const windowHeight = document.documentElement.clientHeight;
  const box = node.getBoundingClientRect();
  const { top, bottom } = box;
  const topVisible = top > 0 && top < windowHeight;
  const bottomVis = bottom > 0 && bottom < windowHeight;
  return topVisible || bottomVis;
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

const light = (func, wait) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
      func()
    }, wait)
  })
};

const step = () => {
  Promise.resolve().then(() => {
    return light(red, 3000)
  }).then(() => {
    return light(green, 2000)
  }).then(() => {
    return light(yellow, 1000)
  }).then(() => {
    return step();
  })
}
step();

const sleep = (time) => {
  return new Promise((reoslve) => {
    setTimeOut(() => {
      resolve()
    }, time)
  })
}

class PromiseQueue {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.runCounts = 0;
  }

  add(time, order) {
    const createPromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve();
        }, time)
      })
    }
    this.queue.push(createPromise)
  }

  run() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue.length || this.runCounts > this.limit) {
      return;
    }
    this.queue.shift()().then(() => {
      this.runCounts--;
      this.request();
    })
  }

}

const concurrencyRequest = (urls, max) => {
  return new Promise((resolve, reject) => {
    const total = urls.length;
    let res = [];
    let completed = 0;
    let current = 0
    if (!total) {
      resolve([]);
      return;
    }
    const request = () => {
      let i = current;
      current++;
      if (i >= total) {
        return;
      }
      fetch(urls[i]).then(val => {
        res[i] = val;
      }).catch(err => {
        res[i] = err;
      }).finally(() => {
        completed++;
        if (completed >= total) {
          resolve(res);
          return;
        }
        request();
      })
    }
    const times = Math.min(total, max);
    while (current < times) {
      request();
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




