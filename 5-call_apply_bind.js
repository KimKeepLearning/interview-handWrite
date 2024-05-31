// call
Function.prototype.myCall = function (context = window, ...args) {
  if (typeof context !== 'object') {
    context = new Object(context);
  }
  let fnKey = Symbol();
  context[fnKey] = this;
  let res = context[fnKey](...args);

  delete context[fnKey];
  return res;
}


// function f(a,b){
//  console.log(a+b)
//  console.log(this.name)
// }
// let obj={
//  name:1
// }

// f.call(obj, 1, 2);


Function.prototype.myBind = function (context = window, ...args) {
  let self = this;
  let fBound = function (...innerArgs) {
    return self.apply(
      //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
      // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
      // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
      this instanceof fBound ? this : context,
      args.concat(innerArgs)
    )
  };
  fBound.prototype = Object.create(this.prototype);
  return fBound;
}

// test
function Person(name, age) {
  console.log('Person name：', name);
  console.log('Person age：', age);
  console.log('Person this：', this); // 构造函数this指向实例对象
}

// 构造函数原型的方法
Person.prototype.say = function() {
  console.log('person say');
}

// 普通函数
function normalFun(name, age) {
  console.log('普通函数 name：', name); 
  console.log('普通函数 age：', age); 
  console.log('普通函数 this：', this);  // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
}

var obj = {
  name: 'poetries',
  age: 18
}
// 先测试作为构造函数调用
var bindFun = Person.myBind(obj, 'poetry1') // undefined
var a = new bindFun(10) // Person name: poetry1、Person age: 10、Person this: fBound {}
a.say() // person say

// 再测试作为普通函数调用
var bindNormalFun = normalFun.myBind(obj, 'poetry2') // undefined
bindNormalFun(12) 
