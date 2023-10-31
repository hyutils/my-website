import G6 from "@antv/g6";
export const registerEdges = (name:string, options?:any)=>{
  G6.registerEdge(
    name,
    {
      afterDraw(cfg:any, group:any) {
        const {startPoint, endPoint} = cfg
        const shape = group.get('children')[0];
        const mx = (startPoint?.x + endPoint.x)/2;
        const my = (startPoint?.y + endPoint.y)/2;
        
        const circle = group.addShape('circle', {
          attrs: {
            x: startPoint.x,
            y: startPoint.y,
            fill: '#1890ff',
            r: 3,
          },
          name: 'circle-shape',
        });
  
        // animation for the red circle
        circle.animate(
          (ratio:any) => {
            const tmpPoint = shape.getPoint(ratio);
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat: true, // Whether executes the animation repeatly
            duration: 3000, // the duration for executing once
          },
        );

        group.addShape('rect', {
          attrs: {
            width: 10,
            height: 10,
            fill: '#f00',
            // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
            x: mx,
            y: my,
          },
          name: 'mid-point-edge-rect', // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
        });
      },
      
      setState(name, value, item:any) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定
        if (name === 'active') {
          if (value) {
            shape.attr('stroke', 'red');
          } else {
            shape.attr('stroke', '#333');
          }
        }
        if (name === 'selected') {
          if (value) {
            shape.attr('lineWidth', 3);
          } else {
            shape.attr('lineWidth', 2);
          }
        }
      },
    },
    'line'
  );
}
