function create(proto) {
  function F() {

  }
  F.prototype = proto;
  return new F();
}

function freeze(obj) {
  if (!(obj instanceof Object)) {
    return;
  }
  Object.seal(obj); // 禁止修改和新增
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      Object.defineProperty(obj, key, {
        writable: false
      })
      freeze(obj[key]);
    }
  }
}

