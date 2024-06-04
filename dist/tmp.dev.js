"use strict";

var _this = void 0;

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debounce = function debounce(func, wait) {
  var timer = 0;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      func.apply(void 0, args);
    }, wait);
  };
};

var instanceOf = function instanceOf(instance, classOrFunc) {
  if (_typeof(instance) !== 'object' || typeof instance === null) {
    return false;
  }

  var proto = Object.getPrototypeOf(instance);

  while (proto) {
    if (proto === classOrFunc.prototype) {
      return true;
    }

    proto = Object.getPrototypeOf(proto);
  }

  return false;
};

var myNew = function myNew(constructor) {
  var obj = Object.create(constructor.prototype);

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  var res = constructor.apply(obj, args);
  return _typeof(res) === 'object' ? res : obj;
};

var call = function call() {
  var _context;

  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  if (_typeof(context) !== 'object') {
    context = new Object(context);
  }

  var key = Symbol();
  context[key] = _this;

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  var res = (_context = context)[key].apply(_context, args);

  delete context[key];
  return res;
};

var apply = function apply() {
  var _context2;

  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var args = arguments.length > 1 ? arguments[1] : undefined;

  if (_typeof(context) !== 'object') {
    context = new Object(context);
  }

  var key = Symbol();
  context[key] = _this;

  var res = (_context2 = context)[key].apply(_context2, _toConsumableArray(args));

  delete context[key];
  return res;
};

Function.prototype.myBind = function () {
  var _this2 = this;

  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var self = this;

  var fBound = function fBound() {
    for (var _len5 = arguments.length, innerArgs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      innerArgs[_key5] = arguments[_key5];
    }

    self.apply(_this2 instanceof fBound ? _this2 : context, args.concat(args, innerArgs));
  };

  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

Function.prototype.myBind2 = function () {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  var self = this;

  var fBound = function fBound() {
    for (var _len7 = arguments.length, innerArgs = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      innerArgs[_key7] = arguments[_key7];
    }

    self.apply(this instanceof fBound ? this : context, args.concat(args, innerArgs));
  };

  fBound.prototype = Object.create(this.prototype);
};

function Parent() {}

function Child() {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var isObject = function isObject(target) {
  return (_typeof(target) === 'object' || typeof target === 'function') && target !== null;
};

var getType = function getType(tar) {
  return Object.prototype.toString.call(tar);
};

var keepCtor = function keepCtor(target, type) {
  var ctor = target.constructor;

  switch (type) {
    case Type.functionType:
      return handleCpFuntion(target);

    case Type.regType:
      return handleCpReg();

    default:
      return new ctor();
  }
};

var handleCpFuntion = function handleCpFuntion(func) {
  if (!func.prototype) {
    return func;
  }

  var funcString = func.toString();
  var paramReg = /(?<=\s\().+(?=\)\s+{)/;
  var bodyReg = /(?<={)(.|\n|\r)+(?=})/m;
  var params = funcString.exec(paramReg);
  var body = funcString.exec(bodyReg);

  if (!body) {
    return function () {};
  }

  if (params) {
    var paraArr = params[0].split(',');
    return _construct(Function, _toConsumableArray(paraArr).concat([body[0]]));
  }

  return new Function(body[0]);
};

var handleCpReg = function handleCpReg(target) {
  var source = target.source,
      flags = target.flags;
  return new target.constructor(source, flags);
};

var Type = {
  mapType: '[object Map]',
  setType: '[object Set]',
  functionType: '',
  regType: ''
};

var deepClone = function deepClone(target) {
  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();

  if (!isObject(target)) {
    return target;
  }

  var type = getType(target);
  var newTarget = keepCtor(target, type);

  if (map.get(target)) {
    return target;
  }

  map.set(target, true);

  if (type === Type.mapType) {
    target.forEach(function (item, key) {
      newTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === Type.setType) {
    target.forEach(function (item) {
      newTarget.add(deepClone(item, map));
    });
  }

  for (var prop in target) {
    if (target.hasOwnProperty(prop)) {
      newTarget[prop] = deepClone(target[prop], map);
    }
  }

  return newTarget;
}; // 2024-6-4:  4, 5, 7 -------接近2h


Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    var len = promises.length;
    var resArr = [];

    var _loop = function _loop(i) {
      Promise.resolve(promises[i]).then(function (res) {
        resArr[i] = res;

        if (resArr.length === len) {
          resolve(resArr);
        }
      })["catch"](function (err) {
        reject(err);
      });
    };

    for (var i = 0; i < len; i++) {
      _loop(i);
    }
  });
};