// 使用Promise实现每隔1秒输出1,2,3
const arr = [1, 2, 3];
arr.reduce((prev, next) => prev.then(() => new Promise((reoslve) => setTimeout(() => reoslve(next, console.log(next)), 1000))), Promise.resolve())