// 发布订阅模式
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    this.events[eventName] = [...(this.events[eventName] || []), callback]
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach(func => func(...args));
  }

  off(eventName, cb) {
    this.events[eventName] = this.events[eventName].filter(fn => fn != cb && fn.initialCallback != callback)
  }

  once(eventName, callback) {
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    }
    one.initialCallback = callback;
    this.on(eventName, one);
  }
}
// 观察者模式
class Subject {
  constructor(state) {
    this.state = state;
    this.observers = []
  }
  attach(o) {
    this.observers.push(o)
  }
  changeState(newState) {
    this.state = newState;
    this.observers.forEach(o => o.update(this));
  }
}

class Observer {
  constructor() {
    this.subject = null;
  }

  update(sub) {
    this.subject = sub
  }

}


// 策略模式
const strategies = {
  strategeA() {
    return {
      bgColor: '',
      text: '',
      color: '',
    }
  },

  strategeB() {
    
  },

  strategeC() {
    
  }
}

strategies[strategeA]()

// 单例模式
let createSingleton = (function () {
  let instance = null;
  return function (name) {
    if (instance) {
      return instance;
    }
    this.name = name;
    return instance = this;
  }
})()