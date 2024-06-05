Array.prototype.myForEach = function (cb, context = window) {
  const self = this;
  for (let i = 0; i < self.length; i++) {
    cb && cb.call(context, self[i], i);
  }
}

Array.prototype.forEach