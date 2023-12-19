// nextTick 的实现原理也是利用事件循环来进行异步操作，然后等 vue 的事件循环结束之后，再执行回调函数。首先大多数情况下，nextTick 会通过 Promise.resolve()来创建一个成功的 Promise，然后再通过 Promise.then()来将回调函数添加入微任务队列。同时，nextTick 还设置了状态锁pedding，通过pedding来判断当前队列当中是否已经存在一个nextTick的任务。这样就可以避免多次执行nextTick的任务，降低系统资源的使用。
// 前面我们说过，大多数情况下，我们使用的是Promise.then()将回调函数添加入事件队列。但是有些情况，我们无法使用这种方式。假如我们的浏览器不支持 Promise 的话，我们就无法使用 Promise 了。这种情况，我们会选择将 nextTick 加入到宏任务队列。另外，当 nextTick 的回调执行的时候，下一次事件循环还没有执行，这时候我们是获取不到更新渲染之后的数据的，因此，这时候我们会将 nextTick 的回调函数添加到宏任务队列当中。加入宏任务队列的方式有很多种，按照优先级来依次为setImmediate、MessageChannel、setTimeout。

// https://juejin.cn/post/7102012612220551181
