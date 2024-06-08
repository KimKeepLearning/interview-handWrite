const setTimeoutMy = (func, wait) => {
  let timer = undefined;
  timer = setInterval(() => {
    clearInterval(timer);
    func();
  }, wait);
}

const setIntervalMy = (func, wait) => {
  let timer = undefined;
  function interval() {
    func();
    timer = setTimeout(interval, wait);
  }
  timer = setTimeout(interval, wait);
  return {
    clear: clearTimeout(timer)
  }
}

Object.freezeMy = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  Object.seal(obj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false,
      })
      freezeMy(obj[key]);
    }
  }
}

const curry = (func, prevArgs = []) => {
  const arity = func.length;
  return (...nextArgs) => {
    const args = [...prevArgs, ...nextArgs];
    if (args.length === arity) {
      return func(...args);
    }
    return curry(func, args);
  };
}

class PromiseMy {
  constructor(handler) {
    this.value = undefined;
    this.successCb = [];
    this.failCb = [];
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    return new Promise((resolveNext, rejectNext) => {
      if (this.status === 'pending') {
        this.successCb.push(reoslveNewPromise);
      }
      if (this.status === 'onFulfilled') {
        reoslveNewPromise(this.value);
      }

      const reoslveNewPromise = (value) => {
        try {
          const res = onFulfilled(value);
          if (res instanceof Promise) {
            res.then(resolveNext, rejectNext);
          } else {
            resolveNext(res);
          }
        } catch (error) {
          rejectNext(error);
        }
      }
    })
  }

}

const myNew = function (constructor, ...args) {
  const newObj = Object.create(constructor.prototype);
  const res = constructor.apply(newObj, args);
  return typeof res === 'object' ? res : newObj;
}




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




