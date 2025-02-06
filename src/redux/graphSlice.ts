import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';

// Define the shape of the state for tracking history
interface HistoryState {
  past: Array<{ nodes: Node[]; edges: Edge[] }>;  // Stores past states for undo
  present: { nodes: Node[]; edges: Edge[] };  // The current state of the nodes and edges
  future: Array<{ nodes: Node[]; edges: Edge[] }>;  // Stores future states for redo
}

// Initial nodes and edges setup for the graph
const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position for nodes
  data: { label: `Node ${i + 1}`, color: '#3498db', fontSize: 14 },  // Default node data
  type: 'default'
}));

const initialEdges: Edge[] = [
  // Initial edges between nodes
  { id: '1-2', source: '1', target: '2' },
  { id: '2-3', source: '2', target: '3' },
  { id: '3-4', source: '3', target: '4' },
  { id: '4-5', source: '4', target: '5' },
  { id: '5-6', source: '5', target: '6' },
  { id: '6-7', source: '6', target: '7' },
  { id: '7-8', source: '7', target: '8' },
  { id: '8-9', source: '8', target: '9' },
  { id: '9-10', source: '9', target: '10' },
];

// Initial state for the Redux store, with past, present, and future
const initialState: HistoryState = {
  past: [],
  present: { nodes: initialNodes, edges: initialEdges },
  future: [],
};

// Redux slice definition for graph state and history management
const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    // Action to update the color of a node
    updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const node = state.present.nodes.find((n) => n.id === action.payload.id);
      if (node) node.data.color = action.payload.color;  // Update the color of the node
    },
    
    // Action to update the font size of a node
    updateFontSize: (state, action: PayloadAction<{ id: string; fontSize: number }>) => {
      const node = state.present.nodes.find((n) => n.id === action.payload.id);
      if (node) node.data.fontSize = action.payload.fontSize;  // Update the font size of the node
    },

    // Action to update the position of a node and push current state to past for undo
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));  // Save current state to past
      state.future = [];  // Clear the future history if a new change occurs
      state.present.nodes = state.present.nodes.map(node =>
        node.id === action.payload.id ? { ...node, position: action.payload.position } : node
      );
    },

    // Action to add a new edge and update the state
    addEdge: (state, action: PayloadAction<{ source: string; target: string }>) => {
      const newEdge: Edge = {
        id: `${action.payload.source}-${action.payload.target}`,
        source: action.payload.source,
        target: action.payload.target,
      };
      state.past.push(JSON.parse(JSON.stringify(state.present)));  // Save the current state
      state.future = [];  // Clear future history
      state.present.edges.push(newEdge);  // Add the new edge
    },

    // Action to delete an edge and update the state
    deleteEdge: (state, action: PayloadAction<{ edgeId: string }>) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));  // Save the current state
      state.future = [];  // Clear future history
      state.present.edges = state.present.edges.filter(edge => edge.id !== action.payload.edgeId);  // Remove the edge
    },

    // Action to undo the last change (restore the last state from past)
    undo: (state) => {
      if (state.past.length > 0) {
        state.future.push(JSON.parse(JSON.stringify(state.present)));  // Save the current state to future
        state.present = state.past.pop()!;  // Restore the last state from past
      }
    },

    // Action to redo the undone change (restore the last undone state from future)
    redo: (state) => {
      if (state.future.length > 0) {
        state.past.push(JSON.parse(JSON.stringify(state.present)));  // Save the current state to past
        state.present = state.future.pop()!;  // Restore the last undone state from future
      }
    }
  }
});

// Export the action creators for dispatching updates to the Redux store
export const { updateNodeColor, updateFontSize, updateNodePosition, addEdge, deleteEdge, undo, redo } = graphSlice.actions;

// Export the reducer to be used in the Redux store
export default graphSlice.reducer;
