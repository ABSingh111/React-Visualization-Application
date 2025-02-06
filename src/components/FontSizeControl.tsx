import React from "react";
import { useDispatch } from "react-redux";
import { updateFontSize } from "../redux/graphSlice.ts"; // Importing the Redux action to update font size

// FontSizeControl component allows users to change the font size of a specific node
const FontSizeControl = ({ nodeId }: { nodeId: string }) => {
  const dispatch = useDispatch(); // Initialize dispatch to send actions to the Redux store

  // Handler function to update the font size in the Redux store
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Dispatch the updateFontSize action with the selected font size
    dispatch(updateFontSize({ id: nodeId, fontSize: parseInt(event.target.value, 10) }));
  };

  return (
    <select onChange={handleFontSizeChange}>  {/* Dropdown to select font size */}
      {/* Mapping through font size options and rendering them as <option> elements */}
      {[12, 14, 16, 18, 20, 22, 24].map((size) => (
        <option key={size} value={size}>
          {size}px  {/* Display the font size as options */}
        </option>
      ))}
    </select>
  );
};

export default FontSizeControl;
