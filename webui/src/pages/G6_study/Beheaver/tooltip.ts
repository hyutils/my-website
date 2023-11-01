import G6 from '@antv/g6';

// 创建自定义 Tooltip 组件
const createCustomTooltip = (node:any)=> {
  const container = document.createElement('div');
  container.className = 'custom-tooltip';
  // 添加你想要的详细内容
  container.innerHTML = `
    <h2>${node.getModel().label}</h2>
    <p>更多详细信息...</p>
  `;
  return container;
}

export const RegisterTooltip = ()=>{
// 注册 Tooltip 行为
G6.registerBehavior('custom-tooltip', {
  getEvents() {
    return {
      'node:mouseenter': 'showTooltip',
      'node:mouseleave': 'hideTooltip',
    };
  },
  showTooltip(e:any) {
    const graph:any = this.graph;
    const node = e.item;
    const tooltip = createCustomTooltip(node);
   
    const model = node.getModel();
    const width = model.size[0];
    const [x, y] = model.x > width / 2 ? [model.x - width / 2, model.y] : [model.x + width / 2, model.y];
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  },
  hideTooltip() {
    const graph:any = this.graph;
    const canvas = graph.get('canvas');
    
    const tooltips = canvas.getElementsByClassName('custom-tooltip');
    for (let i = tooltips.length - 1; i >= 0; i--) {
      canvas.removeChild(tooltips[i]);
    }
  },
});

}


