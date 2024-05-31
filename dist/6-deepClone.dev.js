"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var deepClone = function deepClone(target) {
  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();

  if (!isObject(target)) {
    return target;
  }

  var type = getType(target);
  var cloneTarget = keepCtor(target, type);

  if (map.get(target)) {
    // 解决循环引用
    return target;
  }

  map.set(target, true);

  if (type === Tag.mapTag) {
    target.forEach(function (item, key) {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === Tag.setTag) {
    target.forEach(function (item) {
      cloneTarget.add(deepClone(item, map));
    });
  }

  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }

  return cloneTarget;
};

var isObject = function isObject(target) {
  return (_typeof(target) === 'object' || typeof target === 'function') && target !== null;
};

var getType = function getType(obj) {
  return Object.prototype.toString.call(obj);
};

var Tag = {
  mapTag: '[object Map]',
  setTag: '[object Set]',
  boolTag: '[object Boolean]',
  numberTag: '[object Number]',
  stringTag: '[object String]',
  symbolTag: '[object Symbol]',
  dateTag: '[object Date]',
  errorTag: '[object Error]',
  regexpTag: '[object RegExp]',
  funcTag: '[object Function]'
};
var canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true
};

var keepCtor = function keepCtor(target, type) {
  var ctor = target.contructor;

  switch (type) {
    case Tag.regexpTag:
      return handleRegExp(target);

    case Tag.funcTag:
      return handleFunc(target);

    default:
      return new ctor();
  }
};

var handleRegExp = function handleRegExp(target) {
  var source = target.source,
      flags = target.flags;
  return new target.constructor(source, flags);
};

var handleFunc = function handleFunc(func) {
  if (!func.prototype) {
    return func;
  }

  var funcString = func.toString();
  var bodyReg = /(?<={)(.|\n|\r)+(?=})/m;
  var paramReg = /(?<=\s*\().+(?=\)\s+{)/;
  var param = paramReg.exec(funcString);
  var body = bodyReg.exec(funcString);
  console.log(param, body);
  if (!body) return function () {};

  if (param) {
    var paramArr = param[0].split(',');
    return _construct(Function, _toConsumableArray(paramArr).concat([body[0]]));
  } else {
    return new Function(body[0]);
  }
};

var obj = {
  func: function func(a, b) {
    return 'funcion' + a + b;
  },
  key1: 'value1',
  key2: 2,
  key3: false
};
var cloneObj = deepClone(obj);
console.log(cloneObj.func(1, 2));