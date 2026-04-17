"use client";

import { useRef, useEffect } from "react";

/**
 * GeometryCanvas renders visual math diagrams using JSXGraph.
 * @param {Object} visualData - Contains type + problem-specific params.
 */
export default function GeometryCanvas({ visualData }) {
  const containerRef = useRef(null);
  const boardRef = useRef(null);

  useEffect(() => {
    if (!visualData || !containerRef.current) return;

    // Dynamic import to avoid SSR issues
    import("jsxgraph").then((JXGModule) => {
      const JXG = JXGModule.default || JXGModule;

      // Clean up any existing board
      if (boardRef.current) {
        try { JXG.JSXGraph.freeBoard(boardRef.current); } catch(e) {}
      }

      const board = JXG.JSXGraph.initBoard(containerRef.current, {
        boundingbox: [-1, 12, 12, -1],
        axis: false,
        grid: false,
        showNavigation: false,
        showCopyright: false,
        pan: { enabled: false },
        zoom: { enabled: false },
      });
      boardRef.current = board;

      const style = {
        fillColor: "#6366f1",
        fillOpacity: 0.15,
        strokeColor: "#4f46e5",
        strokeWidth: 3,
        fixed: true,
        highlight: false,
      };

      switch (visualData.type) {
        case "triangle": {
          const { angles } = visualData;
          // Place a triangle on the board using computed angles
          const A = board.create("point", [1, 1], { ...style, name:"A", size:4 });
          const B = board.create("point", [8, 1], { ...style, name:"B", size:4 });
          // Compute C from angle at A
          const rad = (angles[0] * Math.PI) / 180;
          const side = 7;
          const Cx = 1 + side * Math.cos(rad);
          const Cy = 1 + side * Math.sin(rad);
          const C = board.create("point", [Cx, Cy], { ...style, name:"C", size:4 });
          board.create("polygon", [A, B, C], { ...style, vertices: { visible: false } });
          board.create("text", [4, 0.2, `${angles[0]}°`], { fixed:true, fontSize:18, strokeColor:"#4f46e5" });
          board.create("text", [8, 0.2, `${angles[1]}°`], { fixed:true, fontSize:18, strokeColor:"#4f46e5" });
          board.create("text", [(1+Cx)/2 - 0.5, (1+Cy)/2 + 0.4, "?°"], { fixed:true, fontSize:22, strokeColor:"#e11d48" });
          break;
        }
        case "rectangle": {
          const { w, h } = visualData;
          const scaleW = Math.min(w, 9); const scaleH = Math.min(h, 8);
          const A = board.create("point", [1, 1], { visible:false });
          const B = board.create("point", [1+scaleW, 1], { visible:false });
          const C = board.create("point", [1+scaleW, 1+scaleH], { visible:false });
          const D = board.create("point", [1, 1+scaleH], { visible:false });
          board.create("polygon", [A, B, C, D], { ...style });
          board.create("text", [1+scaleW/2-0.3, 0.3, `width = ${w}`], { fixed:true, fontSize:16, strokeColor:"#4f46e5" });
          board.create("text", [1+scaleW+0.2, 1+scaleH/2, `height = ${h}`], { fixed:true, fontSize:16, strokeColor:"#4f46e5" });
          break;
        }
        case "triangle_area": {
          const { b, h } = visualData;
          const scaleB = Math.min(b, 9); const scaleH = Math.min(h, 8);
          const A = board.create("point", [1, 1], { visible:false });
          const B_ = board.create("point", [1+scaleB, 1], { visible:false });
          const C_ = board.create("point", [1+scaleB/2, 1+scaleH], { visible:false });
          board.create("polygon", [A, B_, C_], { ...style });
          // Height line
          board.create("segment", [[1+scaleB/2, 1], [1+scaleB/2, 1+scaleH]], { strokeColor:"#e11d48", dash:2, strokeWidth:2 });
          board.create("text", [1+scaleB/2-1.5, 0.3, `base = ${b}`], { fixed:true, fontSize:16, strokeColor:"#4f46e5" });
          board.create("text", [1+scaleB/2+0.3, 1+scaleH/2, `h = ${h}`], { fixed:true, fontSize:16, strokeColor:"#e11d48" });
          break;
        }
        default:
          break;
      }
    });

    return () => {
      if (boardRef.current) {
        import("jsxgraph").then((JXGModule) => {
          const JXG = JXGModule.default || JXGModule;
          try { JXG.JSXGraph.freeBoard(boardRef.current); } catch(e) {}
          boardRef.current = null;
        });
      }
    };
  }, [visualData]);

  return (
    <div className="w-full flex flex-col items-center my-4">
      <div
        ref={containerRef}
        className="w-full rounded-2xl border-2 border-indigo-200 shadow-inner bg-indigo-50"
        style={{ height: "280px" }}
      />
      <p className="text-xs text-slate-400 font-semibold mt-2 uppercase tracking-widest">Interactive Diagram</p>
    </div>
  );
}
