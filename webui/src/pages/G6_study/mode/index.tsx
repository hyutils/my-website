import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";
import { Button } from "antd";


const Beheaviors: React.FC<any> = (props: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<any>();

    useEffect(() => {
        initDraw();
    }, []);

    const initDraw = () => {
        graphRef.current = new G6.Graph({
            linkCenter: true,
            container: containerRef.current || "",
            height: 800,
            width: 800,
            modes: {
                default: ['drag-node', 'zoom-canvas', 'drag-canvas'], // 默认模式下启用的交互模式
                addEdge: ['create-edge', 'zoom-canvas', 'drag-canvas'], // 建模式
                edit: ['click-select'], // 编辑模式
            },
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
            nodeStateStyles: {
                // The node styles in selected state
                selected: {
                    stroke: '#666',
                    lineWidth: 2,
                    fill: 'steelblue',
                },
            }
        });

        const data = {
            nodes: [
                { id: "node1", x: 100, y: 100, label: "Node 1" },
                { id: "node2", x: 300, y: 100, label: "Node 2" },
                { id: "node3", x: 200, y: 200, label: "Node 3" },
            ],
            edges: [{ source: "node1", target: "node2", label: "Edge 1" }],
        };

        // 渲染图表
        graphRef.current.data(data);
        graphRef.current.render();

        graphRef.current.on('nodeselectchange', (e: any) => {
            // 当前操作的 item
            console.log(e.target);
            // 当前操作后，所有被选中的 items 集合
            console.log(e.selectedItems);
            // 当前操作时选中(true)还是取消选中(false)
            console.log(e.select);
        });
    };

    return (
        <>
            <div>
                <Button onClick={() => { graphRef.current.setMode('default') }}>默认模式</Button>
                <Button onClick={() => { graphRef.current.setMode('edit') }}>编辑模式</Button>
                <Button onClick={() => { graphRef.current.setMode('addEdge') }}>创建边</Button>
            </div>
            <div
                className="ModalgraphContainer"
                ref={containerRef}
                id="graphContainer"
            />
        </>
    );
};
export default Beheaviors;
