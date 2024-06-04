const debounce = (func, wait) => {
  let timer = 0;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  }
};

const instanceOf = (instance, classOrFunc) => {
  if (typeof instance !== 'object' || typeof instance === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(instance);
  while (proto) {
    if (proto === classOrFunc.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

const myNew = (constructor, ...args) => {
  const obj = Object.create(constructor.prototype);
  let res = constructor.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

const call = (context = window, ...args) => {
  if (typeof context !== 'object') {
    context = new Object(context);
  }
  let key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res;
}

const apply = (context = window, args) => {
  if (typeof context !== 'object') {
    context = new Object(context);
  }
  const key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res
}

Function.prototype.myBind = function (context = window, ...args) {
  let self = this;
  let fBound = (...innerArgs) => {
    self.apply(
      this instanceof fBound ? this : context,
      args.concat(args, innerArgs))
  }
  fBound.prototype = Object.create(this.prototype);
  return fBound;
}
Function.prototype.myBind2 = function(context = window, ...args) {
  const self = this;
  let fBound = function (...innerArgs) {
    self.apply(
      this instanceof fBound ? this : context
      , args.concat(args, innerArgs))
  }
  fBound.prototype = Object.create(this.prototype)
}

function Parent() {
  

}

function Child() {
  Parent.call(this)
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;
const getType = tar => Object.prototype.toString.call(tar);

const keepCtor = (target, type) => {
  let ctor = target.constructor;
  switch (type) {
    case Type.functionType:
      return handleCpFuntion(target);
      
    case Type.regType:
      return handleCpReg();
      
    default:
      return new ctor();
  }
}

const handleCpFuntion = (func) => {
  if (!func.prototype) {
    return func;
  }
  const funcString = func.toString();
  const paramReg =  /(?<=\s\().+(?=\)\s+{)/;
  const bodyReg = /(?<={)(.|\n|\r)+(?=})/m;
  const params = funcString.exec(paramReg);
  const body = funcString.exec(bodyReg);
  if (!body) {
    return () => { };
  }
  if (params) {
    const paraArr = params[0].split(',');
    return new Function(...paraArr, body[0]);
  }
  return new Function(body[0]);
}

const handleCpReg = (target) => {
  let { source, flags } = target;
  return new target.constructor(source, flags);
}
const Type = {
  mapType: '[object Map]',
  setType: '[object Set]',
  functionType: '',
  regType: ''
}
const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  let newTarget = keepCtor(target, type);

  if (map.get(target)) {
    return target;
  } 
  map.set(target, true);

  if (type === Type.mapType) {
    target.forEach((item, key) => {
      newTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === Type.setType) {
    target.forEach(item => {
      newTarget.add(deepClone(item, map))
    })
  }

  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      newTarget[prop] = deepClone(target[prop], map);
    }
  }
  return newTarget;

}


// 2024-6-4:  4, 5, 7 -------接近2h

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    const resArr = [];
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(res => {
        resArr[i] = res;
        if (resArr.length === len) {
          resolve(resArr);
        }
      }).catch(err => {
        reject(err);
      })
    }
  })
  
}