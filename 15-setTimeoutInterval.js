// setTimeout => setInterval
const intervalMy = (cb, wait) => {
  let timer = null;
  function interval() {
    cb();
    timer = setTimeout(interval, wait); // 递归
  }
  timer = setTimeout(interval, wait); // 首次

  return {
    cancel: () => {clearTimeout(timer)}
  }
}

// setInterval => setTimeout
const setTimeoutMy = (callback, wait) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    callback();
  }, wait);
}
