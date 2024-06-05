
const ajax = (url, method, paramString) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        //
      }
    }
  }
  xhr.send(paramString);
}

const ajaxPromise = (url, method, paramString) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject('fail')
        }
      }
    }
    xhr.send(paramString);
  });
}

Promise.myResolve = function (param) {
  if (param instanceof Promise) {
    return param;
  }
  return new Promise((resolve, reject) => {
    if (typeof param !== 'object') {
      resolve(param);
    }
    if (param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    }
  })
}

Promise.reject = function (params) {
  return new Promise((resolve, reject) => {
    reject(param);
  })
}

// 在promise结束时，无论结果是FULFILLED或者是rejected，都会执行回调函数
Promise.finally = function (cb) {
  // this指向当前Promise实例
  return this.then(
    res => Promise.resolve(cb()).then(() => res),
    err => Promise.resolve(cb()).then(() => err))
} 

Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    let resArr = [];
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resArr.push(res);
        if (resArr.length === len) {
          resolve(resArr)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
} 

Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolve(res);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}


Promise.allSettled = (promises) => {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    let resArr = [];
    const checkIsEnd = () => {
      if (resArr.length === len) {
        resolve(resArr);
      }
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(
        res => {
          resArr.push({ state: 'fulfilled', value: res });
          checkIsEnd()
        },
        err => {
          resArr.push({ state: 'rejected', value: err });
          checkIsEnd()
        }
      )
    }
  })
}

const Status = {
  Pending: "PENDING",
  Fulfilled: "FULFILLED",
  Rejected: "REJECTED",
}

class MyPromise {
  constructor(handler) {
    this.status = Status.Pending;
    this.value = undefined;
    this.successCallback = [];
    this.failedCallback = [];
    try {
      handler(this.resolve.bind(this), this.reject.bind(this))
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(res) {
    if (this.status === Status.Pending) {
      this.status = Status.Fulfilled;
      this.value = res;
      this.successCallback.forEach(func => {
        func(res);
      })
      
    }
  }

  reject(err) {
    if (this.status === Status.Pending) {
      this.status = Status.Rejected;
      this.value = err;
      this.failedCallback.forEach(func => {
        func(err);
      })
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onFulfilled === 'function' ? onFulfilled : r => { throw r };  
    const { value, status } = this;
    
    return new Promise((resolveNext, rejectNext) => {
      if (status === Status.Pending) {
        this.failedCallback.push(resolveNewPromise);
        this.successCallback.push(rejectNewPromise);
      }
      if (status === Status.Fulfilled) {
        resolveNewPromise(value);
      }
      if(status === Status.Rejected) {
        rejectNewPromise(value)
      }
      // 前一个promise成功时执行的函数
      const resolveNewPromise = value => {
        try {
          const result = onFulfilled(value); //承前
          result instanceof Promise ? result.then(resolveNext, rejectNext) : resolveNext(value) // 启后

        } catch (e) {
          rejectNext(e)
        }
      }

      const rejectNewPromise = reason => {

      }

    })
    
    

  }

}


function Parent() {
  
}

function Child() {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  let newtarget = null;
  if (map.get(tagret)) {
    return target;
  }
  map.set(target, true);

  if (type === setTag) {
    target.forEach(item => {
      newtarget.add(deepClone(item, map));
    })
  }

  if (type === mapTag) {
    target.forEach((item, key) => {
      newtarget.set(deepClone(key, map), deepClone(item, map))
    })
  }
  
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      newtarget[prop] = deepClone(target[prop], map)
    }
  }
  return newtarget;

}

const handleCloneFunction = (func) => {
  if (!func.prototype) {
    return func; // 而箭头函数不是任何类的实例，每次调用都是不一样的引用
  }
  const funcString = func.toString();
  const paramReg = /(?<=\s*\().+(?=\)\s+\{)/;
  const bodyReg = /(?<=\{)(.|\n|\r)+(?=\})/m;

  const params = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (!body) {
    return () => { };
  }

  if (params) {
    const paramsArr = params[0].split(',');
    return new Function(...paramsArr, body[0])
  }
  return new Function(body[0]);
}

Function.prototype.myCall = (context = window, ...args) => {
  const key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res;

}

Function.prototype.myBind = function (context = window, ...args) {
  let self = this;
  const fBound = function (...innerArgs) {
    return self.apply(
      this instanceof fBound ? this : context
      , args.concat(innerArgs)
    )
  }
  fBound.prototype = Object.create(this.prototype);
  return fBound;
}

function mynew(constructor, ...args) {
  let newObj = Object.create(constructor.prototype);
  const res = constructor.apply(newObj, ...args);
  return typeof res === 'object' ? res : newObj;
}
const curry = (func, prevArgs = []) => {
  const len = func.length;
  return (...nextArgs) => {
    const curArgs = [...prevArgs, nextArgs];
    if (curArgs.length === len) {
      return func(...curArgs);
    }
    return curry(func, curArgs);
  }
}
/**
 * 2024-6-4:  4, 5, 7 -------接近2h
 */

/**
 * 2024-6-5: 
 *  8.1-resolve， 8.3-finally, 8.4-all 8.6-race
 *  4
 */

