“冷” vs “热” Observable
===========

https://zhangchen915.gitbooks.io/angular2-training/content/content/Observables/cold_vs_hot_observables.html

### 冷Observables

 观看预录制的视频，用户A按下Play键，电影从头开始播放。 用户B也可以在25分钟后在自己的家里开始播放同一部电影

const obsv = new Observable(observer => {

  setTimeout(() => {
    observer.next(1);
  }, 1000);

  setTimeout(() => {
    observer.next(2);
  }, 2000);

  setTimeout(() => {
    observer.next(3);
  }, 3000);

  setTimeout(() => {
    observer.next(4);
  }, 4000);

});

// Subscription A
setTimeout(() => {
  obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
  obsv.subscribe(value => console.log(`>>>> ${value}`));
}, 2500);

*输出结果：*

```
1
2
3
>>>> 1
4
>>>> 2
>>>> 3
>>>> 4
```

### 热Observables

像是一个现场表演。 你从一开始就参加一个现场乐队表演，但有些人可能迟到25分钟的节目。 乐队不会从头开始播放，后来者必须从那里开始观看表演

使用`publish`方法。 此方法接受一个*冷Observable*作为其来源，并返回一个`ConnectableObservable`的实例，在这种情况下，我们必须显式调用`connect`在我们的*热Observable*开始广播值给其订阅者

const obsv = new Observable(observer => {

  setTimeout(() => {
    observer.next(1);
  }, 1000);

  setTimeout(() => {
    observer.next(2);
  }, 2000);

  setTimeout(() => {
    observer.next(3);
  }, 3000);

  setTimeout(() => {
    observer.next(4);
  }, 4000);

<!-- Cold Observables 转换到 Hot Observables -->
}).publish();

<!-- 开始广播值 -->
obsv.connect();

// Subscription A
setTimeout(() => {
  obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
  obsv.subscribe(value => console.log(`      ${value}`));
}, 2500);

*输出结果：*

1
2
3
>>>> 3
4
>>>> 4

### 自动连接方法

另一个有用的方法使用hot Observables而不是connect是refCount 。 这是一种自动连接方法，只要有多个用户，就会立即开始广播。 类似地，如果订阅者的数量到0，它将停止; 换句话说，如果观众中的每个人走出来，演出都会停止。