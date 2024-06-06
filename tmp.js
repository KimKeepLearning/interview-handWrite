// Array.prototype.forEach = function (cb, context) {
//   const self = this;
//   for (let i = 0; i < self.length; i++) {
//     cb.call(context, self[i], i, self)
//   }
// }

// Array.prototype.reduce = function (cb, initValue) {
//   const self = this;
//   const res = initValue ? initValue : self[0];
//   const startIndex = initValue ? 0 : 1;
//   for (let i = startIndex; i < self.length; i++) {
//     res = cb(res, self[i], i, self)
//   }
//   return res;
// }

// const curry = (func, prevArgs = []) => {
//   let arity = func.length;
//   return (...nextArgs) => {
//     const args = [...prevArgs, ...nextArgs];
//     if (args.length === arity) {
//       return func(...args);
//     }
//     return curry(func, args);
//   }
// }

// const compose = (funcs) => {
//   return funcs.reduce((f, g) => (...args) => f(g(...args)));
// }
// const Ready = 4
// const Success = 200;
// const Storage = 300;
// const ajaxPromise = (url, method, paramString) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === Ready) {
//         if (xhr.status >= Success && xhr.status < 300) {
//           resolve(xhr.responseText);
//         } else {
//           reject('err');
//         }
//       }
//     }
//     xhr.send(paramString);
//   })
// }

// Promise.resolve = function (param) {
//   if (param instanceof Promise) {
//     return param;
//   }
//   return new Promise((resolve, reject) => {
//     if (param.then && typeof param.then === 'function') {
//       param.then(resolve, reject);
//       return;
//     }
//     resolve(param);
//     return;
//   });
// }

// Promise.reject = (param) => {
//   return new Promise((resolve, reject) => {
//     reject(param);
//   })
// } 
// Promise.finally = function (cb) {
//   return this.then(
//     value => Promise.resolve(cb()).then(() => value),
//     reason => Promise.resolve(cb()).then(() => { throw reason })
//   )
// }
// Promise.all = (promises) => {
//   const len = promises.length;
//   let resArr = [];
//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < len; i++) {
//       Promise.resolve(promises[i]).then(res => {
//         resArr.push(res);
//         if (resArr.length === len) {
//           resolve(resArr)
//         }
//       }).catch(err => {
//         reject(err)
//       })
//     }
//   })
// }

// // 完整的promise

// const Status = {
//   Pending: 'PENDING',
//   Fulfilled: 'FULFILLED',
//   Rejected: 'REJECTED',
// }
// class Promise {
//   constructor(handler) {
//     this.value = undefined;
//     this.status = Status.Pending;
//     this.successCb = [];
//     this.failCb = [];
//     try {
//       handler(this.resolve.bind(this), this.reject.bind(this))
//     } catch (e) {
//       this.reject(e)
//     }
//   }
//   resolve(res) {
//     if (this.status !== Status.Pending) {
//       return;
//     }
//     this.status = Status.Fulfilled;
//     this.value = res;
//     this.successCb.forEach(func => {
//       func(res);
//     });
//   }

//   then(onFulfilled, onRejected) {
//     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
//     const resolveNewPromise = function(value) {
//       const res = onFulfilled(value);
//       if (res instanceof Promise) {
//         res.then(resolveNext, rejectNext);
//         return;
//       }
//       resolveNext(value);
//     }
//     return new Promise((resolveNext, rejectNext) => {
//       if (this.status === Status.Pending) {
//         this.successCb.push();
//         this.failCb.push();
//       }
//       if (this.status === Status.Fulfilled) {
//         resolveNewPromise(this.value);
//       }
//     })
    
//   }

// }

// function Parent() {

// }

// function Child() {
//   Parent.call(this)
// }

// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;


// Function.prototype.call = function (context, ...args) {
//   const self = this;
//   const key = Symbol();
//   context[key] = self;
//   const res = context[key](...args);
//   delete context[key]
//   return res;
// }

// Function.prototype.bind = function (context, ...args) {
//   const self = this;
//   let fBound = function (...innerArgs) {
//     return self.apply(
//       this instanceof fBound ? this : context
//       ,
//       args.concat(innerArgs)
//     )
//   }
//   fBound.prototype = Object.create(self.prototype);
//   return fBound;
// }

// function myNew(contrcutor, ...args) {
//   const newObj = Object.create(contrcutor.prototype);
//   const res = constructor.call(newObj, ...args);
//   return res ? res : newObj;
// } 


function object() {
  this.prop1 = 1;
  this.prop2 = 2;
  return {
    name: 21
  };
}

const test = new object();
console.log(test);

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
