import G6 from "@antv/g6";
import rightImg from '../images/1.svg'
const Util = G6.Util;

const getStarPoints = (cx: any, cy: any, r: any, n: any) => {
  const angle = (360 / n) * (Math.PI / 180); // 计算五角星每个角的弧度
  const starPoints = [];

  for (let i = 0; i < n; i++) {
    const x = cx + r * Math.cos(i * angle);
    const y = cy + r * Math.sin(i * angle);
    starPoints.push([x, y]);
  }
  return starPoints;
};

export const registerCustomNode = (name: any, options?: any) => {
  G6.registerNode(name, {
    draw(cfg: any, group: any) {
      const size = cfg.size || 40; // 节点的大小
      const shape: any = group.addShape("polygon", {
        attrs: {
          points: getStarPoints(cfg.x, cfg.y, size, 5), // 获取五角星的顶点坐标
          stroke: "#999",
          fill: "#fff",
        },
        name: "star-shape",
      });

      // 添加节点文本
      group.addShape("text", {
        attrs: {
          x: cfg.x,
          y: cfg.y + size + 10, // 调整 label 的位置
          textAlign: "center",
          text: cfg.label || "", // 节点文本
          fill: "#333",
        },
        name: "text-shape",
      });

      // 添加svg图标
      group.addShape('image',{
        attrs:{
          x: cfg.x,
          y:cfg.y,
          width:20,
          height:20,
          img: rightImg,
          file:'#52C41A'
        },
        id:'image-shape',
        name: 'image-shape'
      })

      return shape;
    },

    setState(name: any, value: any, item: any) {
      const group = item.getContainer();
      const shape = group.get("children")[0]; // 顺序根据 draw 时确定
      console.log("旋转角度", item?._cfg);

      if (name === "active") {
        if (value) {
          // 悬停样式
          shape.attr("fill", "red");
        } else {
          shape.attr("fill", "#1890ff");
        }
      }
      if (name === "selected") {
        if (value) {
          // 选中样式
          shape.attr("stroke", "red");
        } else {
          shape.attr("stroke", "#1890ff");
        }
      }
    },
  });
};
