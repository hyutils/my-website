type ResolveFunction<T> = (value: T | Promise<T> | undefined) => void;
type RejectFunction = (reason?: any) => void;
type Executor<T> = (
  resolve: ResolveFunction<T>,
  reject: RejectFunction
) => void;

class PromiseTs<T> {
  private state: "pending" | "fulfilled" | "rejected";
  private value: T | Promise<T> | undefined;
  private onFulfilledCallbacks: Array<(value: T) => void>;
  private onRejectedCallbacks: Array<(reason: any) => void>;

  constructor(executor: Executor<T>) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve: ResolveFunction<T> = (value) => {
      if (this.state === "pending") {
        if (value instanceof PromiseTs) {
          value.then(resolve, reject);
        } else {
          this.state = "fulfilled";
          this.value = value;
          this.executeCallbacks(this.onFulfilledCallbacks, this.value);
        }
      }
    };

    const reject: RejectFunction = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.executeCallbacks(this.onRejectedCallbacks, this.value);
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  private executeCallbacks(callbacks: any, value: any) {
    setTimeout(() => {
      for (const callback of callbacks) {
        callback(value);
      }
    }, 0);
  }

  then<U>(
    onFulfilled?: any,
    onRejected?: any
  ): PromiseTs<U> {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value: any) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason: any) => {
            throw reason;
          };

    const promise = new PromiseTs<U>((resolve, reject) => {
      if (this.state === "fulfilled") {
        this.executeCallback(onFulfilled, resolve, reject, this.value);
      } else if (this.state === "rejected") {
        this.executeCallback(onRejected, resolve, reject, this.value);
      } else if (this.state === "pending") {
        this.onFulfilledCallbacks.push((value) =>
          this.executeCallback(onFulfilled, resolve, reject, value)
        );
        this.onRejectedCallbacks.push((reason) =>
          this.executeCallback(onRejected, resolve, reject, reason)
        );
      }
    });

    return promise;
  }

  catch<U>(onRejected?: (reason: any) => U | Promise<U>): PromiseTs<U> {
    return this.then(undefined, onRejected);
  }

  private executeCallback(
    callback: Function,
    resolve: Function,
    reject: Function,
    param: any
  ) {
    try {
      const result = callback(param);
      if (result instanceof PromiseTs) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve<U>(value: U | Promise<U>): PromiseTs<U> {
    return new PromiseTs<U>((resolve) => resolve(value));
  }

  static reject<U>(reason?: any): PromiseTs<U> {
    return new PromiseTs<U>((_, reject) => reject(reason));
  }
}

// 示例用法：
const hPromise = new PromiseTs<string>((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve("Success!");
    } else {
      reject(new Error("Failed!"));
    }
  }, 1000);
});

hPromise
  .then((result:any) => {
    console.log("Fulfilled:", result);
    return "Resolved Value";
  })
  .then((value:any) => {
    console.log("Chained then:", value);
    throw new Error("Something went wrong!");
  })
  .catch((error:any) => {
    console.error("Rejected:", error.message);
  });

  export {}