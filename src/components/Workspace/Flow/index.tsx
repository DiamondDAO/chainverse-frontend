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
  useReactFlow,
  ReactFlowProvider,
} from "react-flow-renderer";
import { NoteBlockNode } from "../NoteBlockNode";
import { PartnershipBlockNode } from "../PartnershipBlockNode";
import { EntityNode } from "../EntityNode";

const fitViewOptions: FitViewOptions = {
  padding: 1,
};

interface IFlow {
  nodeData?: any;
  onInit?: any;
  currentNode: any;
  setCurrentNode: (block: any) => void;
  restoredFlow?: any;
}

export const Inner: FC<IFlow> = ({
  nodeData,
  onInit,
  currentNode,
  setCurrentNode,
  restoredFlow,
}) => {
  const { setViewport } = useReactFlow();
  const restoredFlowJSON = useMemo(
    () => (typeof restoredFlow === "string" ? JSON.parse(restoredFlow) : {}),
    [restoredFlow]
  );

  const nodeTypes = useMemo(
    () => ({ noteBlock: NoteBlockNode,
      partnershipBlock: PartnershipBlockNode,
      entity: EntityNode }),
    []
  );
  const initialEdges: Edge[] = useMemo(() => {
    return restoredFlowJSON?.edges ?? [];
  }, [restoredFlowJSON]);
  const initialNodes: Node[] = useMemo(
    () =>
      nodeData?.map((node, idx) => {
        if (node?.__typename === "Entity") {
          const selectedNode = restoredFlowJSON?.nodes?.find((selectNode) =>
            node?.id
              ? node.id === selectNode.id
              : node.name === selectNode.name
          );
          return {
            id: node.id ? node.id : node.name,
            data: {
              node,
              title: node.name,
              avatar: node.avatar,
              dim: false,
            },
            type: "entity",
            position: selectedNode
              ? { x: selectedNode.position.x, y: selectedNode.position.y }
              : { x: 100, y: idx * 150 + 100 },
          };
        } else if (node?.__typename === "Note") {
          const selectedNode = restoredFlowJSON?.nodes?.find(
            (selectNode) => node.uuid === selectNode.id
          );
          return {
            id: node.uuid,
            data: {
              node,
              dim: false,
              label: node.text,
            },
            type: "noteBlock",
            position: selectedNode
              ? { x: selectedNode.position.x, y: selectedNode.position.y }
              : { x: 100, y: idx * 150 + 100 },
          };
        } else if (node?.__typename === "Partnership") {
          const selectedNode = restoredFlowJSON?.nodes?.find(
            (selectNode) => node.uuid === selectNode.id
          );
          return {
            id: node.uuid,
            data: {
              node,
              dim: false,
              label: node.text,
            },
            type: "partnershipBlock",
            position: selectedNode
              ? { x: selectedNode.position.x, y: selectedNode.position.y }
              : { x: 100, y: idx * 150 + 100 },
          };
        }
      }),
    [nodeData, restoredFlowJSON]
  );

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  useEffect(() => {
    const values = restoredFlowJSON?.viewport;
    if (values) {
      setViewport({
        x: values?.x,
        y: values?.y,
        zoom: values?.zoom,
      });
    }
  }, [restoredFlowJSON]);
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

  useEffect(() => {
    if (!currentNode) {
      setNodes((nds) =>
        nds.map((node) => {
          node.data = {
            ...node.data,
            dim: false,
          };

          return node;
        })
      );
    } else {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== currentNode?.id && node.id !== currentNode?.uuid) {
            node.data = {
              ...node.data,
              dim: true,
            };
          }
          return node;
        })
      );
    }
  }, [currentNode]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            label: "Linked To",
            labelBgPadding: [2, 2],
            type: "smoothstep",
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
      onNodeClick={(_, node) => setCurrentNode(node.data.node)}
      onConnect={onConnect}
      onInit={onInit}
      edges={edges}
      connectionLineType={ConnectionLineType.SmoothStep}
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

export const Flow: FC<IFlow> = ({
  nodeData,
  onInit,
  currentNode,
  setCurrentNode,
  restoredFlow,
}) => {
  return (
    <ReactFlowProvider>
      <Inner
        currentNode={currentNode}
        nodeData={nodeData}
        onInit={onInit}
        setCurrentNode={setCurrentNode}
        restoredFlow={restoredFlow}
      />
    </ReactFlowProvider>
  );
};
