
Promise.resolve = (param) => {
  // 如果该值本身就是一个 Promise，那么该 Promise 将被返回
  if (param instanceof Promise) {
    return param
  }
  // 如果该值是一个 thenable 对象，
  // 调用其 then() 方法及其两个回调函数
  if (param && param.then && typeof param.then === 'function') {
    return new Promise((resolve, reject) => {
      param.then(resolve, reject);
    })
  } 
  
  return new Promise(resolve => {
    resolve(param)
  })
 
}

Promise.reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}


Promise.prototype.finallyMy = function (cb) {
  // 在promise结束时，无论结果是FULFILLED或者是rejected，都会执行回调函数
  return this.then(
    // 获取到promise执行成功的结果，将这个结果作为返回的新promise的值
    res => Promise.resolve(cb()).then(() => res),
    err => Promise.resolve(cb()).then(() => {
        throw err
      })
  )
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let res = [];
    let len = promises.length;
    if (len === 0) {
      resolve(res);
      return;
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        result[i] = res;
        if (result.length === len) {
          resolve(result)
          return;
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
}
Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const resArr = [];
    const len = promises.length;
    const checkIsEnd = () => {
      if (resArr.length === len) {
        resolve(resArr)
      }
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resArr[i] = { status: 'FULFILLED', value: res }
        checkIsEnd();
      }, err => {
        resArr[i] = { status: 'rejected', value: err };
        checkIsEnd();
      })
    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if (len === 0) {
      return;
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}

// 一个完整的promise
const PENDING = 'pending';
const FULFILLED = 'FULFILLED';
const REJECTED = 'rejected';

class MyPromise {
  constructor(handler) {
    this.state = PENDING;
    this.value = undefined;
    this.successCallback = [];
    this.failureCallback = [];
    try {
      handler(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e);
    };

  }
  reject(reason) {
    if (this.state !== PENDING) {
      return;
    }
    this.state = REJECTED;
    this.value = reason;
    this.failureCallback.forEach(item => {
      setTimeout(() => {
        item(reason)
      })
    })
  }

  resolve(value) {
    if (this.state !== PENDING) {
      return;
    }
    this.state = FULFILLED;
    this.value = value;
    setTimeout(() => {
      this.successCallback.forEach(item => {
        item(value);
      })
    });
  }
  // 返回一个新的promise, 用来指定下一步的回调函数
  // 本质上可以把它看成是 flatMap
  then(onFULFILLED, onRejected) {
    const { state, value } = this;
    onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    // resolveNext, rejectNext相当于promise里的resolve和reject属性方法，用来更改状态
    // onFULFILLED, onRejected是then里传入的下一个step
    return new MyPromise((resolveNext, rejectNext) => {
      if (state === PENDING) { 
        this.successCallback.push(resolveNewPromise);
        this.failureCallback.push(rejectNewPromise);
      }
      // 要保证在当前promise状态改变后再去改变新的promise状态
      if (this.state === FULFILLED) {
        resolveNewPromise(value)
      }

      if (this.state === REJECTED) {
        rejectNewPromise(value)
      }
      const resolveNewPromise = value => {
        try {
          const res = onFULFILLED(value);
          // 当执行结果返回的是一个promise实例，等待这个promise状态改变后再改变then返回的promise的状态
          if (res instanceof MyPromise) {
            res.then(resolveNext, rejectNext);
          } else {
            resolveNext(res)
          }
        } catch (error) {
          rejectNext(error);
        }
      }
      const rejectNewPromise = (reason) => {
        try {
          if (typeof onRejected !== 'function') {
            rejectNext(reason);
          } else {
            const res = onRejected(reason);
            if (res instanceof MyPromise) { 
              res.then(resolveNext, rejectNext);
            } else {
              rejectNext(res);
            }
          }
        } catch (e) {
          rejectNext(e);
        }
      }
    })
  }
}
