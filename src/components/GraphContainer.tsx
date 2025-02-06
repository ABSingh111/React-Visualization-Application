import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow'; 
import 'reactflow/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { updateNodePosition, addEdge as addEdgeAction, deleteEdge } from '../redux/graphSlice.ts';

// GraphContainer component - displays the graph and handles graph state changes
const GraphContainer: React.FC = () => {
  // Fetching nodes and edges from Redux store
  const reduxNodes = useSelector((state: RootState) => state.graph.present.nodes);
  const reduxEdges = useSelector((state: RootState) => state.graph.present.edges);
  const dispatch = useDispatch();

  // ReactFlow state management for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);

  // Updating nodes whenever the reduxNodes change
  useEffect(() => {
    setNodes(
      reduxNodes.map((node) => ({
        ...node,
        data: { ...node.data }, // Ensure data updates
      }))
    );
  }, [reduxNodes, setNodes]);

  // Updating edges whenever the reduxEdges change
  useEffect(() => {
    setEdges(reduxEdges);
  }, [reduxEdges, setEdges]);

  // Handler to update node position in Redux on drag stop
  const handleNodeDrag = (event: any, node: any) => {
    dispatch(updateNodePosition({ id: node.id, position: node.position }));
  };

  // Handler to add a new edge to Redux on connection
  const handleEdgeConnect = (params: any) => {
    const { source, target } = params;
    dispatch(addEdgeAction({ source, target }));
  };

  // Handler to delete an edge from Redux
  const handleEdgeDelete = (edgeId: string) => {
    dispatch(deleteEdge({ edgeId }));
  };

  return (
    <div style={{ width: '100%', height: '80vh', border: '1px solid #ddd', borderRadius: '5px' }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: { backgroundColor: node.data.color, fontSize: node.data.fontSize }, // Custom styling for nodes
        }))}
        edges={edges}
        onNodeDragStop={handleNodeDrag} // Handle node drag stop
        onNodesChange={onNodesChange}   // Handle changes in nodes
        onEdgesChange={onEdgesChange}   // Handle changes in edges
        onConnect={handleEdgeConnect}   // Handle edge connections
        onEdgeClick={(_, edge) => handleEdgeDelete(edge.id)} // Option to delete edges on click
        fitView
      >
        <Background />   {/* Background grid for the graph */}
        <MiniMap />      {/* MiniMap for navigation */}
        <Controls />     {/* Controls for zoom and pan */}
      </ReactFlow>
    </div>
  );
};

export default GraphContainer;
