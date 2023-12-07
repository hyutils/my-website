import React, { lazy, Suspense } from 'react';


// 使用懒加载的组件
const MyComponent = (importComponent:any) => {
  // 返回一个函数组件
  return (props:any) => {
    const LazyComponent = lazy(importComponent);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default MyComponent;
