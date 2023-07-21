class PromiseJs {
  constructor(executor) {
    // 初始化 Promise 的状态和值
    this.state = 'pending';
    this.value = undefined;

    // 定义 resolve 和 reject 函数
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
      }
    };

    try {
      // 执行 executor 函数，并传入 resolve 和 reject 函数
      executor(resolve, reject);
    } catch (error) {
      // 如果执行过程中捕获到异常，将 Promise 状态改为 rejected
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果没有传入 onFulfilled 或 onRejected，则创建一个默认的函数来传递值或原因
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    return new PromiseJs((resolve, reject) => {
      // 根据 Promise 的状态执行对应的回调函数
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === 'pending') {
        // 如果 Promise 的状态还是 pending，将回调函数添加到待处理队列中
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(this.value);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 示例用法：
const myPromise = new PromiseJs((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('Success!');
    } else {
      reject(new Error('Failed!'));
    }
  }, 1000);
});

myPromise
  .then((result) => {
    console.log('Fulfilled:', result);
    return 'Resolved Value';
  })
  .then((value) => {
    console.log('Chained then:', value);
  })
  .catch((error) => {
    console.error('Rejected:', error);
  });
