const throttle = (func, wait) => {
  let lastTime = 0;
  return function (...args) {
    let now = +new Date();
    if (now - lastTime >= wait) {
      lastTime = now;
      func.apply(this, args);
    }
  }
}
// 5.31
const throttle531 = (func, wait) => {
  let lastTime = 0;
  return function (...args) {
    const now = +new Date();
    if (now - lastTime > wait) {
      lastTime = now; // !
      func.apply(this, args);
    }
  }
}