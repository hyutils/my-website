import React, { Component } from 'react';

// 高阶组件
const withLazyLoad = (importComponent:any) => {
  return class extends Component {
      state = {
        LazyComponent: null,
      };
    
    componentDidMount() {
      // 动态导入组件并更新状态
      importComponent().then((module:any) => {
        const LazyComponent = module.default || module;
        this.setState({ LazyComponent });
      });
    }

    render() {
      const { LazyComponent } = this.state;

      // 如果组件已加载，则渲染懒加载的组件
      if (LazyComponent) {
        return React.createElement(LazyComponent, this.props);
      }

      // 如果组件尚未加载，不渲染
      return null;
    }
  };
};


export default withLazyLoad;
