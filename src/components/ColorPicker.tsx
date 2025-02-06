import React from "react";
import { useDispatch } from "react-redux";
import { updateNodeColor } from "../redux/graphSlice.ts"; // Importing the Redux action to update the node color

// ColorPicker component allows users to pick a color for a specific node
const ColorPicker = ({ nodeId }: { nodeId: string }) => {
  const dispatch = useDispatch(); // Initialize dispatch to send actions to the Redux store

  // Handler function to update the node color in the Redux store
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch the updateNodeColor action with the selected color
    dispatch(updateNodeColor({ id: nodeId, color: event.target.value }));
  };

  return (
    <input
      type="color"  // Color input type allows users to select a color
      onChange={handleColorChange} // Trigger color update on change
    />
  );
};

export default ColorPicker;
