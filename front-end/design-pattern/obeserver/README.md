# 关于观察者模式和订阅发布模式

主要区别在于，订阅发布模式有一个调度中心，比如说 jquery 的 trigger 和 on 的实现（自己粗略写了下）：

``` js
const $ = {};

$.on = function(eventName, callback) {
  if ($[eventName] === undefined) {
    $[eventName] = new Array();
  }
  $[eventName].push(callback);
};

$.trigger = function(eventName) {
  for (let i in $[eventName]) {
    $[eventName][i].call();
  }
};
```

事件被发布者推送到调度中心 $ 之后，订阅者从调度中心获取事件并执行。

而观察者模式是没有调度中心的，自己想个例子：

``` js
class Subject {
  constructor(name) {
    this.name = name;
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  notify(callback) {
    for(let observer of this.observer) {
      callback(observer);
    }
  }
}

class Observer {
  constructor() {
    this.name = name;
  }
}

const thief = new Subject('Yve');
const policeman1 = new Observer('David');
const policeman2 = new Observer('Ellen');
const policeman3 = new Observer('Wallance');

thief.notify(policeman => {
  console.log(`${policeman.name} is chasing ${thief.name}.`);
});
```
