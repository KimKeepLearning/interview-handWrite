// 函数式编程相关

// 柯里化
const curry = (func, prevArgs = []) => {
  const len = func.length;
  return (...nextArgs) => {
    const curArgs = [...prevArgs, ...nextArgs];
    if (curArgs.length === len) {
      return func(...curArgs);
    }
    return curry(func, curArgs);
  }
}
// 组合函数
const compose = (...funcs) => {
  return funcs.reduce((f, g) => (...args) => f(g(...args)));
}

const pipe = (...funcs) => {
  return funcs.reduce((f, g) => (...args) => g(f(...args)));
}

// example:
function fn1(x) {
  return x - 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x * 4;
}
const a = pipe(fn1, fn2, fn3, fn4);
console.log(a(2));