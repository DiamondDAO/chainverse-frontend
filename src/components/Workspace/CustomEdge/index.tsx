import { useCallback } from "react";
import { useStore, getBezierPath } from "react-flow-renderer";

import { getEdgeParams } from "./utils";

export const FloatingEdge = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const d = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <g className="react-flow__connection">
      <path
        id={id}
        className="react-flow__edge-path"
        d={d}
        markerEnd={markerEnd}
        style={style}
      />
    </g>
  );
};

export const FloatingConnectionLine = ({
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  sourceNode,
}) => {
  if (!sourceNode) {
    return null;
  }

  const targetNode = {
    id: "connection-target",
    __rf: { width: 1, height: 1, position: { x: targetX, y: targetY } },
  };

  const { sx, sy } = getEdgeParams(sourceNode, targetNode);
  const d = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
  });

  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={d}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#fff"
        r={3}
        stroke="#222"
        strokeWidth={1.5}
      />
    </g>
  );
};
