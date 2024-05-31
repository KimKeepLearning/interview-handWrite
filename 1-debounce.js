const debounce = (func, wait) => {
  let timer = 0;
  return function (...args)  {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait)
  }
}

// 5.31
const debounce531 = (func, wait = 50) => {
  let timer = 0;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait)
  }
}