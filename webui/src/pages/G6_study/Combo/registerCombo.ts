import G6 from "@antv/g6";
export const RegisterCombo = (name: string) => {
  G6.registerCombo(
    name,
    {
      drawShape(cfg: any, group: any) {
        // 在此处定义 Combo 元素的绘制方式
        // 使用 group 参数绘制 Combo 的形状和样式
        const rect = group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: "#7FB7FF",
            stroke: "#2B5FFB",
            lineWidth: 2,
          },
          name: "my-combo-tect",
        });
        // 添加文本标签
        group.addShape("text", {
          attrs: {
            x: 50,
            y: 25,
            text: cfg.label,
            fill: "green",
            fontSize: 12,
            textAlign: "center",
            textBaseline: "middle",
          },
          name: "my-combo-text",
        });

        group.addShape("circle", {
          attrs: {
            fill: "#fff",
            stroke: "#999",
            opacity: 1,
            x: 50,
            y: 50,
            r: 5,
          },
          name: "my-combo-circcle",
        });

        return rect;
      },
      update(cfg, item) {
        // 在此处定义 Combo 元素的更新方式
        // 使用 item 参数来更新 Combo 元素
      },
    },
    "rect"
  );
};
