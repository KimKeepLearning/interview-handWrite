Array.prototype.myForEach = function (cb, context) {
  const self = this;
  for (let i = 0; i < self.length; i++) {
    cb && cb.call(context, self[i], i);
  }
}

Array.prototype.myFilter = function (cb, context) {
  const self = this;
  const res = []
  for (let i = 0; i < self.length; i++) {
    if (cb.call(context, self[i], i)) {
      res.push(self[i]);
    }
  }
  return res;
}

// find: 返回第一个满足条件的元素值


Array.prototype.map = function (cb, context) {
  const self = this;
  let res = [];
  for (let i = 0; i < self.length; i++) {
    res.push(cb.call(context, self[i], i, this))
  }
  return res;
}

Array.prototype.reduce = function (cb, initValue) {
  const self = this;
  let res = initValue ? initValue : self[0];
  const startIndex = initValue ? 0 : 1;
  for (let i = startIndex; i < self.length; i++) {
    res = cb(res, self[i], i, self);
  }
  return res;
}


// !数组扁平化
// ? 1-reduce
const flatReduce = arr => {
  return arr.reduce((prev, next) => prev.concat(Array.isArray(next) ? flatArray(next) : next), [])
}
// ? 2- regexp
const flatReg = arr => {
  const string = arr.toString();
  return string.replace(/(\[|\])/g, '').split(',');
}
// console.log(flatReg([1, 2, [3, 4], [5, [6, 7]]]))


Array.isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

Array.myOf = function () {
  return [].slice.call(arguments);
}

console.log(Array.myOf(3, 5, 7))