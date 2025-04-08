import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d"; // ✅ 전용 import

const MeetingKeywordGraph = ({ center, keywords }) => {
  const fgRef = useRef();

  const nodes = [
    { id: center, main: true },
    ...keywords.map((k) => ({
      id: k.word,
      color: k.color || "#888",
    })),
  ];

  const links = keywords.map((k) => ({
    source: center,
    target: k.word,
  }));

  return (
    <div className="keyword-graph" style={{ height: "500px" }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeCanvasObject={(node, ctx) => {
          const label = node.id;
          const fontSize = node.main ? 18 : 13;
          ctx.font = `${fontSize}px Pretendard`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.main ? "#000" : node.color || "#555";
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={() => "#ccc"}
        nodeRelSize={6}
      />
    </div>
  );
};

export default MeetingKeywordGraph;
