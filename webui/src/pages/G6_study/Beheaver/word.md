# 交互与事件

# 监听和绑定事件
在 G6 中，提供了直接的单机事件、还有监听时机的方法。可以监听画布、节点、边、以及各函数被调用的时机等：

### 1. 绑定事件

要绑定事件，首先需要获得图表实例（`Graph` 实例），然后使用 `on` 方法来绑定事件。
分为三类：全局事件、canvas事件、节点/边/combo事件；

```javascript
graph.on(eventName, handler);
// 以点击事件为例
// 全局
graph.on('click', ev=>{});
// canvas事件
graph.on('canvas:click', ev=>{});
// 点边及combo事件
graph.on('node/edge/combo:click',ev=>{});
```
- `eventName` 是事件名称，可以是 G6 内置事件，也可以是自定义事件。
- `handler` 是事件处理程序，是一个函数，用于处理事件发生时的逻辑。

### 2. 内置事件

G6 提供了一些内置事件，用于处理图表的各种交互。例如一些常见的内置事件：

- `'node:click'`: 节点被点击时触发。
- `'node:mouseenter'`: 鼠标进入节点时触发。
- `'node:mouseleave'`: 鼠标离开节点时触发。
- `'edge:click'`: 边被点击时触发。
- `'edge:mouseenter'`: 鼠标进入边时触发。
- `'edge:mouseleave'`: 鼠标离开边时触发。
- `'canvas:click'`: 画布被点击时触发。
- `'canvas:mouseenter'`: 鼠标进入画布时触发。
- `'canvas:mouseleave'`: 鼠标离开画布时触发。
这里只是列举其中几个
### 3. 事件处理程序

事件处理程序是一个函数，用于定义事件触发时的逻辑。它通常有两个参数：

- `e`: 事件对象，包含事件的详细信息。
- `item`: 与事件相关联的图元素，如节点或边。

下面是一个示例，演示如何绑定 `'node:click'` 事件和相应的处理程序：

```javascript
graph.on('node:click', (e, item) => {
  // 在控制台中打印节点的 ID
  console.log('Node Clicked:', item.getModel().id);
});
```

### 4. 解绑事件

要解绑事件，你可以使用 `off` 方法。解绑事件的一般语法如下：

```javascript
graph.off(eventName, handler);
```

- `eventName` 是要解绑的事件名称。
- `handler` 是要解绑的事件处理程序。

### 5. 时机监听
时机事件指渲染、视口变换、元素增删改、数据变换等时机。
比如下面例子绑定了渲染完成时机的监听，afterrender、afterlayout 一类事件必须在 graph.render() 或 graph.read() 之前绑定，方可监听到首次渲染、布局完成后的相关事件。
```
graph.on('afterrender', (ev) => {
  // ... do sth
});
```
# 内置行为Behavior
在 AntV G6 中，Behavior 是一种行为，它用于定义图表上的互动和交互行为。Behavior 允许你自定义鼠标交互、拖拽、缩放、选择等操作，以改变图表的状态和展示。G6目前提供了14个内置的Behavior。

G6 提供了一些内置的 Behavior，可以在创建图表实例时配置，例如：
AntV G6 提供了一些内置的行为（Behaviors），用于在图表中处理用户交互和操作。以下是 G6 内置的一些常见行为以及它们的作用：

1. `drag-canvas`: 允许用户拖拽整个画布。
2. `zoom-canvas`: 允许用户缩放画布。
3. `drag-node`: 允许用户拖拽节点。
4. `drag-combo`: 允许用户拖拽群组（Combo）。
5. `collapse-expand-combo`: 允许用户折叠/展开群组。
6. `scroll-canvas`: 滚轮滚动画布,v4.2.6 起支持。
7. `click-select`: 单击选中节点或边。
8. `lasso-select`: 使用 Lasso 工具框选节点或边。
9. `brush-select`: 使用 Brush 工具框选节点或边。
10. `tooltip-edge`: 使用方式基本与 tooltip 相同，但是移到边时触发。
11. `tooltip`: 节点文本提示。
12. `activate-relations`: 选中节点时，高亮相关的边。
13. `shortcuts-call`: 允许终端用户使用键盘组合键调用 Graph 的函数，例如按下键盘上的 control 与 1，对图进行适应画布。
14. `collapse-expand`: 只适用于树图，展开或收起子树。

使用：
```javascript
const graph = new G6.Graph({
  container: 'container',
  width: 800,
  height: 600,
  modes: {
    default: [
    {
      type:'drag-canvas',
      direction: 'both' //允许拖拽方向，支持'x'，'y'，'both'，默认方向为 'both'；
      enableOptimize: true // 是否开启优化，开启后拖动画布过程中隐藏所有的边及节点上非 keyShape 部分，默认关闭
    },
    {
      type:'tooltip',
      offset: 10,
      formatText: model=>{
       // 格式化函数，可以返回文本或者 HTML, 这里返回label字段
        return model.label;
      }
    },
    {
      type:'brush-select', // 框选
      brushStyle:{ // 设置框选样式，填充色，填充色透明度，边框色，边框宽度
        fill:'', 
        fillOpacity:'',
        stroke:'',
        lineWidth:1
      },
      selectedState: '', // 选中的状态，默认是selected, 可以根据自己的需求设置样式
      trigger:'' // 触发框选的动作
    },
    'scroll-canvas', 'zoom-canvas', 'drag-node','click-select','tooltip','create-edge','edge-tooltip'],
  },
  // ...其他配置...
});
  //当节点开始被拖拽的时候触发的事件
  graph.on('node:dragstart', ev=>{});
  // 节点再拖拽过程中触发
  graph.on('node:drag', ev=>{});
  // 节点再拖拽完成时触发
  graph.on('node:dragend', ev=>{});
  // 使用了 'brush-select' , 'click-select' 或 'lasso-select' Behavior 且选中元素发生变化时，该事件被触发
  graph.on('nodeselectchange', ev=>{
    const { nodes, edges } = ev.selectedItems; //获取框选的数据
  });
  // 创建边之后触发
  graph.on('aftercreateedge', ev=>{
    const edge = ev.edge.getModel(); // 创建的边
    // 获取边的起点和终点, 进行其他操作
    const source = edge.source;
    const target = edge.target;
  });

```
上述代码中，`modes` 属性定义了内置行为。并且监听了一些行为的事件，用法就是这样用的。

# 自定义交互（Behavior）
除了内置行为，你还可以创建自定义的 Behavior 来实现特定的交互需求。通过 G6.registerBehavior(name, config)。创建，name为行为名字，创建自定义行为后需要引用到图例中，然后在modes里面使用该交互行为。
自定义 Behavior 可以包括以下几个主要部分：

getDefaultCfg(): 返回默认的配置选项。
getEvents(): 返回事件监听配置，指定哪些事件会触发该 Behavior。
shouldBegin(e): 定义 Behavior 开始的条件。
shouldUpdate(e): 定义 Behavior 更新的条件。
shouldEnd(e): 定义 Behavior 结束的条件。
bind(graph): 绑定到图表实例，使 Behavior 生效。
unbind(): 解绑 Behavior。

下面简单实现一个双击画布创建点的自定义交互：
```
import G6 from "@antv/g6";
import _ from "lodash";
export const RegisterAddNode = () => {
  G6.registerBehavior("create-node", {
    getEvents() {
      return {
        // 监听 createOn 事件，触发 createNode 方法
        "canvas:dblclick": "createNode",
      };
    },
    createNode(e: any) {
      const graph: any = this.graph;
      // 获取鼠标位置
      const point = graph.getPointByClient(e.clientX, e.clientY);
      // 创建新节点
      graph.addItem("node", {
        x: point.x,
        y: point.y,
        size: 32,
        id: _.uniqueId("_node"),
        label: "New node",
        // group: true,
      });
    },
  });
};
```
使用：
```
import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";
import _ from "lodash";
import { RegisterAddNode } from "./registerAddNode";


const Beheaviors: React.FC<any> = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>();

  useEffect(() => {
    initDraw();
  }, []);

  const initDraw = () => {
    RegisterAddNode(); // 初始化画布引用自定义交互
    graphRef.current = new G6.Graph({
      linkCenter: true,
      container: containerRef.current || "",
      height: 800,
      width: 800,
      modes: { default: ["create-node", "drag-canvas", "drag-node", "custom-tooltip"] },
      defaultNode: {
        size: 20,
        style: {
          fill: "#C6E5FF",
          stroke: "#5B8FF9",
          lineWidth: 0.3,
        },
        labelCfg: {
          style: {
            fontSize: 12,
          },
          position: "bottom",
          offset: 1,
        },
      },
      defaultEdge: {
        style: {
          lineWidth: 2,
          color: "#000",
          labelCfg: {
            autoRotate: true,
            refY: 5,
            style: {
              fill: "#000",
            },
          },
          endArrow: {
            fill: "#000",
            path: G6.Arrow.triangle(10, 12, 25),
            d: 25,
          },
        },
      },
    });

    const data = {
      nodes: [
        { id: "node1", x: 100, y: 100, label: "Node 1" },
        { id: "node2", x: 300, y: 100, label: "Node 2" },
      ],
      edges: [{ source: "node1", target: "node2", label: "Edge 1" }],
    };

    // 渲染图表
    graphRef.current.data(data);
    graphRef.current.render();
  };

  return (
    <>
      <div
        className="ModalgraphContainer"
        ref={containerRef}
        id="graphContainer"
      ></div>
    </>
  );
};
export default Beheaviors;
```
上面的代码里创建了一个名为 create-node 的自定义 Behavior，它监听鼠标的 canvas:dblclick 事件，并在触发时创建新节点。然后在初始化图例时引用。在modes里面加上交互名字'create-node'。这样在双击画布时就会默认添加一个点。

# G6支持的所有事件

