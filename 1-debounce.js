const debounce = (func, wait) => {
  let timer = 0;
  return function (...args)  {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait)
  }
}