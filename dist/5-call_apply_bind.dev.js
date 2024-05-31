"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// call
Function.prototype.myCall = function () {
  var _context;

  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if (_typeof(context) !== 'object') {
    context = new Object(context);
  }

  var fnKey = Symbol();
  context[fnKey] = this;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var res = (_context = context)[fnKey].apply(_context, args);

  delete context[fnKey];
  return res;
}; // function f(a,b){
//  console.log(a+b)
//  console.log(this.name)
// }
// let obj={
//  name:1
// }
// f.call(obj, 1, 2);


Function.prototype.myBind = function () {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var self = this;

  var fBound = function fBound() {
    for (var _len3 = arguments.length, innerArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      innerArgs[_key3] = arguments[_key3];
    }

    return self.apply( //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
    // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
    // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
    this instanceof fBound ? this : context, args.concat(innerArgs));
  };

  fBound.prototype = Object.create(this.prototype);
  return fBound;
}; // test


function Person(name, age) {
  console.log('Person name：', name);
  console.log('Person age：', age);
  console.log('Person this：', this); // 构造函数this指向实例对象
} // 构造函数原型的方法


Person.prototype.say = function () {
  console.log('person say');
}; // 普通函数


function normalFun(name, age) {
  console.log('普通函数 name：', name);
  console.log('普通函数 age：', age);
  console.log('普通函数 this：', this); // 普通函数this指向绑定bind的第一个参数 也就是例子中的obj
}

var obj = {
  name: 'poetries',
  age: 18
}; // 先测试作为构造函数调用

var bindFun = Person.myBind(obj, 'poetry1'); // undefined

var a = new bindFun(10); // Person name: poetry1、Person age: 10、Person this: fBound {}

a.say(); // person say
// 再测试作为普通函数调用

var bindNormalFun = normalFun.myBind(obj, 'poetry2'); // undefined

bindNormalFun(12);