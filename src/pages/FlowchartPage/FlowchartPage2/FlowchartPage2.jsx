import React, { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import the icons

const FlowchartPage2 = () => {
  // Flowchart data structure
  const initialNodes = [
    // Experiment & Design (Entry point)
    {
      id: "experiment",
      label: "Experiment & Design",
      type: "entry",
      level: "entry",
      x: 50,
      y: 350,
      hidden: false,
    },

    // PACE 21 (Main interactive nodes)
    {
      id: "p21_1",
      label: "Could you survive a natural disaster?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 50,
      hidden: true,
    },
    {
      id: "p21_2",
      label: "How do we grow healthy communities?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 120,
      hidden: true,
    },
    {
      id: "p21_3",
      label: "How can I become better, faster, stronger?",
      type: "red",
      level: "pace21",
      x: 250,
      y: 190,
      hidden: true,
    },
    {
      id: "p21_4",
      label: "What on Earth?",
      type: "blue",
      level: "pace21",
      x: 250,
      y: 260,
      hidden: true,
    },
    {
      id: "p21_5",
      label: "What creates a criminal?",
      type: "blue",
      level: "pace21",
      x: 250,
      y: 330,
      hidden: true,
    },
    {
      id: "p21_6",
      label: "Can you be a sporting superstar?",
      type: "purple",
      level: "pace21",
      x: 250,
      y: 400,
      hidden: true,
    },
    {
      id: "p21_7",
      label: "What is the journey from farm to fork?",
      type: "purple",
      level: "pace21",
      x: 250,
      y: 470,
      hidden: true,
    },
    {
      id: "p21_8",
      label: "How do we use technology to improve our lives?",
      type: "green",
      level: "pace21",
      x: 250,
      y: 540,
      hidden: true,
    },
    {
      id: "p21_9",
      label: "Why does it taste like that?",
      type: "green",
      level: "pace21",
      x: 250,
      y: 610,
      hidden: true,
    },

    // PACE 21 REACH
    {
      id: "p21r_1",
      label: "Where do I come from?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 50,
      hidden: true,
    },
    {
      id: "p21r_2",
      label: "How does sports science improve performance?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 120,
      hidden: true,
    },
    {
      id: "p21r_3",
      label: "What does it mean to be human?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 190,
      hidden: true,
    },
    {
      id: "p21r_4",
      label: "Are we eating our environment?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 260,
      hidden: true,
    },
    {
      id: "p21r_5",
      label: "How can we explore the stars?",
      type: "orange",
      level: "reach",
      x: 450,
      y: 330,
      hidden: true,
    },
    {
      id: "p21r_6",
      label: "Pre-VCE Physical Sciences",
      type: "orange",
      level: "reach",
      x: 450,
      y: 400,
      hidden: true,
    },
    {
      id: "p21r_7",
      label: "Pre-VCE Human Sciences",
      type: "orange",
      level: "reach",
      x: 450,
      y: 470,
      hidden: true,
    },
    {
      id: "p21r_8",
      label: "VET Conservation and Ecosystem Management",
      type: "orange",
      level: "reach",
      x: 450,
      y: 540,
      hidden: true,
    },
    {
      id: "p21r_9",
      label: "VET Animal Care",
      type: "orange",
      level: "reach",
      x: 450,
      y: 610,
      hidden: true,
    },

    // VCE/VCE-VM/VET
    {
      id: "vce_1",
      label: "VCE Health & Human Development",
      type: "orange",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 50,
      hidden: true,
    },
    {
      id: "vce_2",
      label: "VCE PE",
      type: "orange",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 120,
      hidden: true,
    },
    {
      id: "vce_3",
      label: "VCE Psychology",
      type: "green",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 190,
      hidden: true,
    },
    {
      id: "vce_4",
      label: "VCE Physics",
      type: "green",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 260,
      hidden: true,
    },
    {
      id: "vce_5",
      label: "VCE Chemistry",
      type: "green",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 330,
      hidden: true,
    },
    {
      id: "vce_6",
      label: "VCE Biology",
      type: "green",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 400,
      hidden: true,
    },
    {
      id: "vce_7",
      label: "VCE Environmental Science",
      type: "green",
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: 470,
      hidden: true,
    },
    {
      // Add VCE-VM node as it's in the image but missing from initialNodes
      id: "vce_vm",
      label: "VCE-VM",
      type: "orange", // Assuming type based on surrounding VCE nodes
      level: "vce",
      x: 850, // x-coordinate adjusted for more space
      y: -20, // Adjusted y to be above VCE Health
      hidden: true,
    },
  ];

  // Connection mapping between nodes
  const connectionMap = {
    experiment: [
      "p21_1",
      "p21_2",
      "p21_3",
      "p21_4",
      "p21_5",
      "p21_6",
      "p21_7",
      "p21_8",
      "p21_9",
    ],

    p21_1: ["p21r_1", "p21r_2"],
    p21_2: ["p21r_1", "p21r_2"],
    p21_3: ["p21r_3", "p21r_4"],
    p21_4: ["p21r_5", "p21r_6"],
    p21_5: ["p21r_5", "p21r_6"],
    p21_6: ["p21r_3", "p21r_4"],
    p21_7: ["p21r_7", "p21r_8"],
    p21_8: ["p21r_9"],
    p21_9: ["p21r_7", "p21r_8"],

    p21r_1: ["vce_1", "vce_2", "vce_3"],
    p21r_2: ["vce_4", "vce_5"],
    p21r_3: ["vce_6", "vce_7"],
    p21r_4: ["vce_3", "vce_6"],
    p21r_5: ["vce_4", "vce_5", "vce_7"],
    p21r_6: ["vce_4", "vce_5"],
    p21r_7: ["vce_1", "vce_3", "vce_6"],
    p21r_8: ["vce_7"],
    p21r_9: ["vce_6"],
    // Add connections for VCE-VM if they exist in your full diagram
    vce_vm: ["vce_1", "vce_2", "vce_3", "vce_4", "vce_5", "vce_6", "vce_7"], // Example connection based on common VCE pathways
  };

  const svgRef = useRef();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);

  // Helper to get node CSS classes
  const getNodeClasses = (node) => {
    let classes = `node node-${node.type}`;
    if (node.hidden) classes += " hidden";
    if (node.disabled) classes += " disabled";
    if (node.isSelected) classes += " selected";
    return classes;
  };

  // Handle node clicks
  const handleNodeClick = useCallback(
    (node) => {
      // If clicking a disabled node, do nothing
      if (nodes.find((n) => n.id === node.id)?.disabled) {
        return;
      }

      // If clicking the same node, deselect it and revert visibility
      if (selectedNode === node.id) {
        const nodeIndex = selectedPath.indexOf(node.id);
        const newPath = selectedPath.slice(0, nodeIndex); // Path up to the parent of the deselected node

        let nodesToShowIds = new Set();
        if (newPath.length > 0) {
          const lastNodeInNewPath = newPath[newPath.length - 1];
          nodesToShowIds.add(lastNodeInNewPath);
          const parentConnections = connectionMap[lastNodeInNewPath] || [];
          parentConnections.forEach((id) => nodesToShowIds.add(id));
        } else {
          // If deselecting the 'experiment' node or a PACE 21 node as the only selection
          nodesToShowIds.add("experiment");
        }

        setNodes((prevNodes) =>
          prevNodes.map((n) => ({
            ...n,
            hidden: !nodesToShowIds.has(n.id), // Hide if not in nodesToShowIds
            isSelected: newPath.includes(n.id), // Mark only nodes in the new path as selected
            disabled: !nodesToShowIds.has(n.id) && n.id !== "experiment", // Disable if hidden and not 'experiment'
          }))
        );

        const newEdges = [];
        for (let i = 0; i < newPath.length - 1; i++) {
          newEdges.push({
            id: `edge-${newPath[i]}-${newPath[i + 1]}`,
            source: newPath[i],
            target: newPath[i + 1],
          });
        }
        if (newPath.length > 0) {
          const lastNodeInPath = newPath[newPath.length - 1];
          const connectionsOfLastNode = connectionMap[lastNodeInPath] || [];
          connectionsOfLastNode.forEach((targetId) => {
            newEdges.push({
              id: `edge-${lastNodeInPath}-${targetId}`,
              source: lastNodeInPath,
              target: targetId,
            });
          });
        }
        setEdges(newEdges);

        setSelectedPath(newPath);
        setSelectedNode(
          newPath.length > 0 ? newPath[newPath.length - 1] : null
        );
        return;
      }

      // Prevent selecting a 'red' PACE 21 node if 'experiment' is not the immediate parent
      // This logic needs to be careful: if you select a non-red PACE21, it should show its connections.
      // If you then try to select a red PACE21, it should give the toast.
      if (
        node.level === "pace21" &&
        node.type === "red" &&
        selectedPath[selectedPath.length - 1] !== "experiment" &&
        !selectedPath.includes(node.id) // Only if this red node is not already in the path
      ) {
        toast.info("Please choose one from the red boxes under Pace 21!");
        return;
      }

      // Determine the new path
      let currentPath = [];
      const nodeIndexInPath = selectedPath.indexOf(node.id);

      if (nodeIndexInPath !== -1) {
        // If clicking a node that is already in the path (but not the last selected)
        // We need to truncate the path to this node
        currentPath = selectedPath.slice(0, nodeIndexInPath + 1);
      } else {
        // If clicking a new node, extend the path
        currentPath = [...selectedPath, node.id];
      }

      const connectedNodes = connectionMap[node.id] || [];
      const nodesToDisplayIds = new Set([...currentPath, ...connectedNodes]);

      setNodes((prevNodes) =>
        prevNodes.map((n) => ({
          ...n,
          hidden: !nodesToDisplayIds.has(n.id), // Hide if not in the set of nodes to display
          isSelected: n.id === node.id,
          disabled: !nodesToDisplayIds.has(n.id), // Disable if hidden
        }))
      );

      const newEdges = [];
      // Add edges for the current path
      for (let i = 0; i < currentPath.length - 1; i++) {
        newEdges.push({
          id: `edge-${currentPath[i]}-${currentPath[i + 1]}`,
          source: currentPath[i],
          target: currentPath[i + 1],
        });
      }
      // Add edges from the newly selected node to its connections
      connectedNodes.forEach((targetId) => {
        newEdges.push({
          id: `edge-${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
        });
      });
      setEdges(newEdges);

      setSelectedNode(node.id);
      setSelectedPath(currentPath);
    },
    [nodes, selectedNode, selectedPath]
  );

  // Draw the flowchart with D3
  const drawFlowchart = useCallback(() => {
    const svg = d3.select(svgRef.current);
    const visibleNodes = nodes.filter((n) => !n.hidden);

    // টেক্সট র‍্যাপ করার ফাংশন (Function to wrap text)
    function wrapText(text, width, lineHeight) {
      text.each(function () {
        const textElement = d3.select(this);
        const words = textElement.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let y = textElement.attr("y");
        let tspan = textElement
          .text(null)
          .append("tspan")
          .attr("x", textElement.attr("x"))
          .attr("y", y)
          .attr("dy", 0);

        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = textElement
              .append("tspan")
              .attr("x", textElement.attr("x"))
              .attr("y", y)
              .attr("dy", lineHeight + "px")
              .text(word);
          }
        }

        // ভার্টিক্যাল সেন্টারিং (Vertical Centering)
        const tspanNodes = textElement.selectAll("tspan").nodes();
        const totalHeight = tspanNodes.length * lineHeight;
        textElement
          .selectAll("tspan")
          .attr("y", y - totalHeight / 2 + lineHeight / 2);
      });
    }

    // Draw nodes
    const nodeGroups = svg
      .selectAll(".node-group")
      .data(visibleNodes, (d) => d.id);

    // Enter new nodes
    const newNodeGroups = nodeGroups
      .enter()
      .append("g")
      .attr("class", (d) => `node-group ${getNodeClasses(d)}`)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => handleNodeClick(d));

    newNodeGroups
      .append("rect")
      .attr("width", 180)
      .attr("height", 60)
      .attr("rx", 8);

    // Updated text append with wrapText function
    newNodeGroups
      .append("text")
      .attr("x", 90)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "11px") // Reduced font size
      .text((d) => d.label) // Set the initial text
      .call(wrapText, 160, 15); // Apply text wrapping with a line height of 15px

    // SVG paths for FaArrowLeft and FaArrowRight
    const faArrowLeftSvg = `<svg viewBox="0 0 448 512" fill="currentColor" width="16px" height="16px"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32L109.3 224l105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
    const faArrowRightSvg = `<svg viewBox="0 0 448 512" fill="currentColor" width="16px" height="16px"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0-67.4 67.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;

    // Update existing nodes and add icons conditionally
    const mergedNodeGroups = nodeGroups
      .merge(newNodeGroups)
      .transition()
      .duration(300)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("class", (d) => `node-group ${getNodeClasses(d)}`);

    // Remove existing foreignObjects from all nodes before re-adding
    mergedNodeGroups.selectAll("foreignObject").remove();

    // Conditionally add icons based on selectedPath
    mergedNodeGroups.each(function (d) {
      const group = d3.select(this);
      const isNodeInPath = selectedPath.includes(d.id);
      const isLastNodeInPath = selectedPath[selectedPath.length - 1] === d.id;
      const isExperimentNode = d.id === "experiment";
      const isVceLevel = d.level === "vce";

      // If it's a VCE level node, no icons
      if (isVceLevel) {
        return;
      }

      // Add FaArrowLeft if it's in the path and not the first node in the path (i.e., not 'experiment' if experiment is first)
      // And not the current selected node (only previous path nodes should show back)
      if (isNodeInPath && !isExperimentNode && !isLastNodeInPath) {
        group
          .append("foreignObject")
          .attr("class", "arrow-icon left-arrow")
          .attr("x", 5) // Position for left arrow
          .attr("y", 22)
          .attr("width", 16)
          .attr("height", 16)
          .html(
            `<div style="color: white; display: flex; align-items: center; justify-content: center;">${faArrowLeftSvg}</div>`
          );
      }

      // Add FaArrowRight if it's in the path (including 'experiment') OR it's the currently selected node
      // The currently selected node should show right arrow to indicate next possible steps
      if (isNodeInPath || d.id === selectedNode) {
        group
          .append("foreignObject")
          .attr("class", "arrow-icon right-arrow")
          .attr("x", 159) // Position for right arrow
          .attr("y", 22)
          .attr("width", 16)
          .attr("height", 16)
          .html(
            `<div style="color: white; display: flex; align-items: center; justify-content: center;">${faArrowRightSvg}</div>`
          );
      }
    });

    // Remove exited nodes
    nodeGroups.exit().transition().duration(300).style("opacity", 0).remove();

    // Draw edges
    const edgePaths = svg.selectAll(".edge").data(edges, (d) => d.id);

    edgePaths
      .enter()
      .append("path")
      .attr("class", "edge")
      .attr("fill", "none")
      .attr("stroke", "#666") // এজ এর রঙ এখানে পরিবর্তন করতে পারেন
      .attr("stroke-width", 2)
      .merge(edgePaths)
      .transition()
      .duration(300)
      .attr("d", (d) => {
        const source = nodes.find((n) => n.id === d.source);
        const target = nodes.find((n) => n.id === d.target);
        if (!source || !target) return "";

        // Create a curved path
        const midX = (source.x + 180 + target.x) / 2;
        return `M${source.x + 180},${source.y + 30}
                          Q${midX},${source.y + 30} ${midX},${target.y + 30}
                          T${target.x},${target.y + 30}`;
      });

    edgePaths.exit().transition().duration(300).style("opacity", 0).remove();
  }, [nodes, edges, handleNodeClick, selectedPath, selectedNode]);

  useEffect(() => {
    drawFlowchart();
  }, [drawFlowchart]);

  return (
    <div className="flowchart-container">
      <h1>Science & Innovation Pathways</h1>
      <svg ref={svgRef} width="1200" height="900"></svg>
      <ToastContainer position="top-center" />

      <style jsx>{`
        .flowchart-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #101828; /* ব্যাকগ্রাউন্ড কালার */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: white; /* H1 টেক্সটের রঙ */
          font-size: 24px;
          font-weight: bold;
        }
        .node rect {
          stroke: #333; /* বর্ডার রঙ (আপনি আপনার পছন্দ অনুযায়ী পরিবর্তন করতে পারেন) */
          stroke-width: 1.5px;
          fill: #000000; /* সব কার্ডের ফিল কালার */
          rx: 8;
          ry: 8;
        }

        /* সমস্ত নোড টাইপের জন্য ফিল কালার #000000 সেট করা হচ্ছে */
        .node-entry rect,
        .node-red rect,
        .node-blue rect,
        .node-purple rect,
        .node-green rect,
        .node-orange rect {
          fill: #000000;
        }

        .node text {
          font-size: 11px;
          fill: white; /* টেক্সটের রঙ */
          pointer-events: none;
          font-weight: bold;
        }
        .node tspan {
          white-space: pre;
          fill: white; /* tspan এর টেক্সটের রঙ */
        }

        .node.disabled rect {
          fill: #333; /* অক্ষম কার্ডের জন্য সামান্য ভিন্ন গাঢ় রঙ */
          stroke: #555;
          cursor: not-allowed;
        }
        .node.disabled text {
          fill: #aaa; /* অক্ষম কার্ডের টেক্সটের রঙ */
        }
        .node.selected rect {
          stroke: #f1c40f; /* নির্বাচিত কার্ডের বর্ডারের রঙ */
          stroke-width: 3px;
          filter: drop-shadow(0 0 5px rgba(241, 196, 15, 0.7));
        }
        .node.hidden {
          display: none;
        }
        .edge {
          stroke: #666; /* এজের রঙ */
          stroke-dasharray: 5;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 10;
          }
        }
        .arrow-icon {
          pointer-events: none;
        }
        .arrow-icon div {
          color: white; /* Arrow icon এর রঙ */
        }

        svg {
          display: block;
          margin-left: auto;
          margin-right: auto;
          background-color: #101828; /* SVG এর ব্যাকগ্রাউন্ড রঙ */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default FlowchartPage2;
