const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  const cloneTarget = keepCtor(target, type);

  if (map.get(target)) { // 解决循环引用
    return target
  }
  map.set(target, true);
 
  if (type === Tag.mapTag) {
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map))
    });
  }

  if (type === Tag.setTag) {
    target.forEach(item => {
      cloneTarget.add(deepClone(item, map))
    })
  }

  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
}

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;
const getType = obj => Object.prototype.toString.call(obj);
const Tag = {
  mapTag: '[object Map]',
  setTag: '[object Set]',
  boolTag : '[object Boolean]',
  numberTag : '[object Number]',
  stringTag : '[object String]',
  symbolTag : '[object Symbol]',
  dateTag : '[object Date]',
  errorTag : '[object Error]',
  regexpTag : '[object RegExp]',
  funcTag : '[object Function]',
}
const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
};
const keepCtor = (target, type) => {
  const ctor = target.constructor;
  switch (type) {
    case Tag.regexpTag: 
      return handleRegExp(target);
    case Tag.funcTag:
      return handleFunc(target);
    default:
      return new ctor();
  }
}

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
}

const handleFunc = (func) => {
  if (!func.prototype) {
    return func;
  }
  const funcString = func.toString();
  const bodyReg = /(?<={)(.|\n|\r)+(?=})/m
  const paramReg = /(?<=\s*\().+(?=\)\s+{)/

  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  console.log( param, body);
  if (!body) return () => {};
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }

}

const obj = {
  func: function(a, b) {
    return 'funcion' + a + b;
  },
  key1: 'value1',
  key2: 2,
  key3: false,
}

const cloneObj = deepClone(obj)

console.log(cloneObj.func(1, 2))