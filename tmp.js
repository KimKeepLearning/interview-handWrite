const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) {
    return target;
  }
  const type = getType(target);
  const cloneTarget = keepCtor(type, target);

  if (map.get(target)) {
    return target;
  }
  map.set(target, true);

  if (type === Tag.setTag) {
    target.forEach(item => {
      cloneTarget.add(deepClone(item, map))
    });
  }

  if (type === Tag.mapTag) {
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map))
    })
  }

  for (let item in target) {
    if (target.hasOwnProperty(item)) {
      cloneTarget[item] = deepClone(target[item], map)
    }
  }
  return cloneTarget
}

const Tag = {
  mapTag: '[object map]',
  setTag: '[object set]',
  
}

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const getType = target => Object.prototype.toString.call(target);

const keepCtor = (target, type) => {
  const ctor = target.contructor;

  switch (type) {
    case Tag.regexpTag: 
    case Tag.funcTag:
    default:
      return new ctor();
  }
}

const handleRegExp = (target) => {
  const { source, flags } = target;
  return new RegExp(source, flags);
}

const handleFunc = (func) => {
  if (!func.prototype) {
    return func;
  }
  const funcString = func.toString();
  const paramReg = /\\f/;
  const bodyReg = / /m;
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return () => { };
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } 
  return new Function(body[0]);

}