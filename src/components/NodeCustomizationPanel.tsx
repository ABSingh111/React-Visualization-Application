import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { updateNodeColor, updateFontSize } from '../redux/graphSlice.ts';

// NodeCustomizationPanel component allows users to customize selected node's color and font size
const NodeCustomizationPanel: React.FC = () => {
  const dispatch = useDispatch();
  
  // Fetching nodes from the Redux store
  const nodes = useSelector((state: RootState) => state.graph.present.nodes);
  
  // Default: Select the first node in the list if available
  const [nodeId, setNodeId] = useState(nodes.length > 0 ? nodes[0].id : ''); 
  const [color, setColor] = useState('#3498db'); // Default color
  const [fontSize, setFontSize] = useState(14);  // Default font size

  // Updating color and font size based on selected node
  useEffect(() => {
    const selectedNode = nodes.find((node) => node.id === nodeId);
    if (selectedNode) {
      setColor(selectedNode.data.color);  // Set the color of the selected node
      setFontSize(selectedNode.data.fontSize); // Set the font size of the selected node
    }
  }, [nodeId, nodes]);

  // Handler for color change input
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor); // Update local color state
    dispatch(updateNodeColor({ id: nodeId, color: newColor })); // Dispatch color update to Redux
  };

  // Handler for font size change input
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = Number(event.target.value);
    setFontSize(size); // Update local font size state
    dispatch(updateFontSize({ id: nodeId, fontSize: size })); // Dispatch font size update to Redux
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
      <h4>Customize Node</h4>
      {/* Dropdown to select the node to customize */}
      <select value={nodeId} onChange={(e) => setNodeId(e.target.value)}>
        {nodes.map((node) => (
          <option key={node.id} value={node.id}>{node.data.label}</option> // Display each node's label
        ))}
      </select>
      <br />
      
      {/* Color picker to change the node color */}
      <label>Color: </label>
      <input type="color" value={color} onChange={handleColorChange} />
      <br />
      
      {/* Font size range slider to adjust node font size */}
      <label>Font Size: </label>
      <input type="range" min="12" max="24" value={fontSize} onChange={handleFontSizeChange} />
      <span>{fontSize}px</span>
    </div>
  );
};

export default NodeCustomizationPanel;
