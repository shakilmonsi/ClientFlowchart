import * as d3 from "d3";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 🌲 Tree Data
const data = {
  id: "experiment",
  label: "Experiment & Design",
  children: [
    {
      id: "p21_1",
      label: "Could you survive a natural disaster?",
      children: [
        {
          id: "p21r_1",
          label: "Where do I come from?",
          children: [
            { id: "vce_1", label: "VCE Health & Human Development" },
            { id: "vce_2", label: "VCE PE" },
            { id: "vce_3", label: "VCE Psychology" },
          ],
        },
        {
          id: "p21r_2",
          label: "How does sports science improve performance?",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
          ],
        },
      ],
    },
    {
      id: "p21_2",
      label: "How do we grow healthy communities?",
      children: [
        {
          id: "p21r_1",
          label: "Where do I come from?",
          children: [
            { id: "vce_1", label: "VCE Health & Human Development" },
            { id: "vce_2", label: "VCE PE" },
            { id: "vce_3", label: "VCE Psychology" },
          ],
        },
        {
          id: "p21r_2",
          label: "How does sports science improve performance?",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
          ],
        },
      ],
    },
    {
      id: "p21_3",
      label: "How can I become better, faster, stronger?",
      children: [
        {
          id: "p21r_3",
          label: "What does it mean to be human?",
          children: [
            { id: "vce_6", label: "VCE Biology" },
            { id: "vce_7", label: "VCE Environmental Science" },
          ],
        },
        {
          id: "p21r_4",
          label: "Are we eating our environment?",
          children: [
            { id: "vce_3", label: "VCE Psychology" },
            { id: "vce_6", label: "VCE Biology" },
          ],
        },
      ],
    },
    {
      id: "p21_4",
      label: "What on Earth?",
      children: [
        {
          id: "p21r_5",
          label: "How can we explore the stars?",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
            { id: "vce_7", label: "VCE Environmental Science" },
          ],
        },
        {
          id: "p21r_6",
          label: "Pre-VCE Physical Sciences",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
          ],
        },
      ],
    },
    {
      id: "p21_5",
      label: "What creates a criminal?",
      children: [
        {
          id: "p21r_5",
          label: "How can we explore the stars?",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
            { id: "vce_7", label: "VCE Environmental Science" },
          ],
        },
        {
          id: "p21r_6",
          label: "Pre-VCE Physical Sciences",
          children: [
            { id: "vce_4", label: "VCE Physics" },
            { id: "vce_5", label: "VCE Chemistry" },
          ],
        },
      ],
    },
    {
      id: "p21_6",
      label: "Can you be a sporting superstar?",
      children: [
        {
          id: "p21r_3",
          label: "What does it mean to be human?",
          children: [
            { id: "vce_6", label: "VCE Biology" },
            { id: "vce_7", label: "VCE Environmental Science" },
          ],
        },
        {
          id: "p21r_4",
          label: "Are we eating our environment?",
          children: [
            { id: "vce_3", label: "VCE Psychology" },
            { id: "vce_6", label: "VCE Biology" },
          ],
        },
      ],
    },
    {
      id: "p21_7",
      label: "What is the journey from farm to fork?",
      children: [
        {
          id: "p21r_7",
          label: "Pre-VCE Human Sciences",
          children: [
            { id: "vce_1", label: "VCE Health & Human Development" },
            { id: "vce_3", label: "VCE Psychology" },
            { id: "vce_6", label: "VCE Biology" },
          ],
        },
        {
          id: "p21r_8",
          label: "VET Conservation and Ecosystem Management",
          children: [{ id: "vce_7", label: "VCE Environmental Science" }],
        },
      ],
    },
    {
      id: "p21_8",
      label: "How do we use technology to improve our lives?",
      children: [
        {
          id: "p21r_9",
          label: "VET Animal Care",
          children: [{ id: "vce_6", label: "VCE Biology" }],
        },
      ],
    },
    {
      id: "p21_9",
      label: "Why does it taste like that?",
      children: [
        {
          id: "p21r_7",
          label: "Pre-VCE Human Sciences",
          children: [
            { id: "vce_1", label: "VCE Health & Human Development" },
            { id: "vce_3", label: "VCE Psychology" },
            { id: "vce_6", label: "VCE Biology" },
          ],
        },
        {
          id: "p21r_8",
          label: "VET Conservation and Ecosystem Management",
          children: [{ id: "vce_7", label: "VCE Environmental Science" }],
        },
      ],
    },
  ],
};

const TreeChart = () => {
  const [visibleNodes, setVisibleNodes] = useState([data]);
  const [links, setLinks] = useState([]);
  const [parentMap, setParentMap] = useState({ [data.id]: null });
  const [nodePositions, setNodePositions] = useState({});
  const svgRef = useRef();
  const containerRef = useRef();
  const nodeMapRef = useRef({});

  useEffect(() => {
    const map = {};
    const walk = (n) => {
      map[n.id] = n;
      n.children?.forEach(walk);
    };
    walk(data);
    nodeMapRef.current = map;
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const bounds = containerRef.current.getBoundingClientRect();
    const container = containerRef.current;

    svg.selectAll(".draggable-node").call(
      d3.drag().on("drag", function (event) {
        const id = d3.select(this).attr("data-id");
        const scrollLeft = container.scrollLeft;
        const scrollTop = container.scrollTop;
        const newX = Math.max(
          scrollLeft,
          Math.min(event.x, bounds.width - 260 + scrollLeft)
        );
        const newY = Math.max(
          scrollTop,
          Math.min(event.y, bounds.height - 80 + scrollTop)
        );
        setNodePositions((prev) => ({ ...prev, [id]: { x: newX, y: newY } }));
      })
    );
  }, [visibleNodes]);

  const handleNodeClick = (node) => {
    if (!node.children) return;

    const siblings = visibleNodes.filter(
      (n) => parentMap[n.id] === parentMap[node.id]
    );
    const toRemove = siblings
      .filter((n) => n.id !== node.id)
      .flatMap((n) => [n.id, ...getDescendants(n.id)]);

    setVisibleNodes((prev) => prev.filter((n) => !toRemove.includes(n.id)));
    setLinks((prev) => prev.filter((l) => !toRemove.includes(l.to)));

    const newNodes = node.children.filter(
      (c) => !visibleNodes.find((v) => v.id === c.id)
    );
    const newLinks = newNodes.map((c) => ({ from: node.id, to: c.id }));
    const newMap = { ...parentMap };
    newNodes.forEach((c) => (newMap[c.id] = node.id));
    setParentMap(newMap);
    setVisibleNodes((prev) => [...prev, ...newNodes]);
    setLinks((prev) => [...prev, ...newLinks]);
  };

  const getDescendants = (id) => {
    const stack = [id],
      result = [];
    while (stack.length) {
      const current = stack.pop();
      const children = nodeMapRef.current[current]?.children || [];
      for (let child of children) {
        result.push(child.id);
        stack.push(child.id);
      }
    }
    return result;
  };

  const handleBack = (id) => {
    const toRemove = [id, ...getDescendants(id)];
    setVisibleNodes((prev) => prev.filter((n) => !toRemove.includes(n.id)));
    setLinks((prev) => prev.filter((l) => !toRemove.includes(l.to)));
  };

  const getLevel = (id) => {
    let depth = 0,
      cur = id;
    while (parentMap[cur]) {
      cur = parentMap[cur];
      depth++;
    }
    return depth;
  };

  const getNodePos = (id, index) => {
    if (nodePositions[id]) return nodePositions[id];
    const level = getLevel(id);
    const nodesAtLevel = visibleNodes.filter((n) => getLevel(n.id) === level);
    const siblingIndex = nodesAtLevel.findIndex((n) => n.id === id);
    const column = siblingIndex >= 6 ? 1 : 0;
    const x = 200 + level * 300 + column * 300;
    const y = 100 + (siblingIndex % 6) * 120;
    return { x, y };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-auto bg-[#101828] p-6"
    >
      <div className="min-w-[1200px] min-h-[1000px] relative">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#FFD700" />
            </marker>
          </defs>

          {links.map((link, i) => {
            const from = getNodePos(link.from, i);
            const to = getNodePos(link.to, i);
            return (
              <motion.path
                key={i}
                d={`M${from.x + 130},${from.y + 30} C${from.x + 130},${
                  from.y + 80
                } ${to.x + 130},${to.y - 50} ${to.x + 130},${to.y}`}
                stroke="#FFD700"
                fill="none"
                strokeWidth={2}
                markerEnd="url(#arrow)"
                className="animated-line-flow"
              />
            );
          })}

          <AnimatePresence>
            {visibleNodes.map((node, i) => {
              const pos = getNodePos(node.id, i);
              const isLeaf = !nodeMapRef.current[node.id]?.children?.length;
              return (
                <motion.g
                  key={node.id}
                  className="draggable-node"
                  data-id={node.id}
                  initial={{ opacity: 0, scale: 0.8, x: 300, y: 100 }}
                  animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <>
                    <foreignObject width={260} height={100}>
                      <div
                        onClick={() => handleNodeClick(node)}
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          background: "#000",
                          border: `2px solid ${isLeaf ? "#FFD700" : "#666"}`,
                          borderRadius: "10px",
                          padding: "10px",
                          color: "#fff",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        <span style={{ fontSize: 14, lineHeight: 1.2 }}>
                          {node.label}
                        </span>
                      </div>
                    </foreignObject>

                    {parentMap[node.id] && (
                      <foreignObject x={80} y={85} width={100} height={20}>
                        <div
                          style={{
                            fontSize: 14,
                            color: "#fff",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBack(node.id);
                          }}
                        >
                          ← Back
                        </div>
                      </foreignObject>
                    )}
                  </>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>

      <style>{`
        .animated-line-flow {
          stroke-dasharray: 8 4;
          stroke-dashoffset: 0;
          animation: dashMove 2s linear infinite;
        }
        @keyframes dashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
      `}</style>
    </div>
  );
};

export default TreeChart;
