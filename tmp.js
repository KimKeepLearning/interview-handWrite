const setIntervalMy = (func, wait) => {
  let timer = undefined;
  function interval() {
    func();
    timer = setTimeoutMy(interval, wait);
  }
  timer = setTimeoutMy(interval, wait);
  return {
    clear: () => clearTimeout(timer)
  }
}

const setTimeoutMy = (func, wait) => {
  let timer = undefined;
  timer = setInterval(() => {
    if (timer) {
      clearInterval(timer);
    }
    func();
  }, wait);
}

const create = (proto) => {
  function fn() { };
  fn.prototype = proto;
  return new fn();
}

const freeze = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  Object.seal(obj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false,
      })
      freeze(obj[key]);
    }
  }
}

Array.prototype.reduceMy = function (cb, initvalue) {
  const self = this;
  let res = initvalue ? initvalue : self[0];
  const start = initvalue ? 0 : 1;
  for (let i = start; i < self.length; i++) {
    res = cb(res, self[i], i, self);
  }
  return res;
}

Array.prototype.myMap = function (cb, thisArgs) {
  const self = this;
  const res = [];
  for (let i = 0; i < self.length; i++) {
    res[i] = cb.call(thisArgs, self[i], i, self);
  }
  return res;
}

const flat = (arr) => {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flat(cur) : cur));
}

Array.myOf = function () {
  return [].slice.call(arguments);
}

const curry = (func, prevArgs = []) => {
  const arity = func.length;
  return function (...nextArgs) {
    const args = [...prevArgs, ...nextArgs];
    if (args.length === arity) {
      func(...args)
    } else {
      curry(func, args);
    }
  }
}


const compose = (...funcs) => {
  return funcs.reduce((f, g) => (...args) => f(g(...args)));
}

Promise.allMy = function (promises) {
  
  return new Promise((resolve, reject) => {
    const res = [];
    for (let i = 0; i < promises.length; i++) {
      (Promise.resolve(promises[i]).then(v => {
        res.push(v);
        if (res.length === promises.length) {
          resolve(res)
        }
      }).catch((e) => {
        reject(e)
      })
      )
    }
  })
}

class Promise {
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    if (this.status === 'pending') {
      this.success.push(resolveNewPromise)
    }
    if (this.status === 'onFulfilled') {
      resolveNewPromise(this.value)
    }

    const resolveNewPromise = (value) => {
      return new Promise((reoslveNext, rejectNext) => {
        try {
          const res = onFulfilled(value);
          if (res instanceof Promise) {
            res.then(reoslveNext, rejectNext);
          } else {
            reoslveNext(res);
          }
        } catch (e) {
          rejectNext(e)
        }
      });
    }

  }
}
Function.prototype.bind = function (context, ...args) {
  const self = this;
  let fBound = function (...innerArgs) {
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(innerArgs))
  }
  fBound.prototype = Object.create(this.prototype);
  return fBound;
}

/**
 * 2024-6-4:  4, 5, 7 -------接近2h
 */

/**
 * 2024-6-5: 
 *  8.1-resolve， 8.3-finally, 8.4-all 8.6-race
 *  4
 */

/**
 * 2024-6-6:
 * 8. 完整的promise
 * 5. bind
 */
/**
 * 2024-6-7:
 * 15: setInterval
 * 13: Object.freeze
 * 10: curry
 * 8: then
 */
