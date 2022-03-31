import { FC, useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Connection,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  FitViewOptions,
  NodeChange,
  EdgeChange,
  Controls,
  Background,
  MarkerType,
  ConnectionLineType,
} from "react-flow-renderer";
import { BlockNode } from "../BlockNode";

const initialEdges: Edge[] = [];

const fitViewOptions: FitViewOptions = {
  padding: 1,
};

interface IFlow {
  nodeData?: any;
  onInit?: any;
}

export const Flow: FC<IFlow> = ({ nodeData, onInit }) => {
  const nodeTypes = useMemo(() => ({ block: BlockNode }), []);

  const initialNodes: Node[] = useMemo(
    () =>
      nodeData?.map((i, idx) => {
        return {
          id: i.uuid,
          data: {
            label: i.text,
          },
          type: "block",
          position: { x: 100, y: idx * 150 + 100 },
        };
      }),
    [nodeData]
  );

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  console.log(initialNodes);
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => {
        return applyEdgeChanges(changes, eds);
      }),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            label: "Linked To",
            labelBgPadding: [2, 2],
            type: "straight",
            labelStyle: {
              fill: "#9C9C9C",
              fontFamily: "Rubik",
              fontWeight: 500,
            },
            labelBgStyle: {
              fill: "#E8F4FF",
              fontWeight: 500,
            },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    [setEdges]
  );
  return (
    <ReactFlow
      nodes={nodes}
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onConnect={onConnect}
      onInit={onInit}
      edges={edges}
      connectionLineType={ConnectionLineType.Straight}
      connectionLineStyle={{ strokeWidth: "1.5px" }}
      fitView
      defaultZoom={0.5}
      nodeTypes={nodeTypes}
      fitViewOptions={fitViewOptions}
    >
      <Background />

      <Controls />
    </ReactFlow>
  );
};
