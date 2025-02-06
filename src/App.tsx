import React from "react";
import GraphContainer from "./components/GraphContainer.tsx";
import NodeCustomizationPanel from "./components/NodeCustomizationPanel.tsx";
import UndoRedoControls from "./components/UndoRedoControls.tsx";

const App = () => {
  return (
    <div>
      <h1>Interactive Graph Visualizer</h1>
      <UndoRedoControls />
      <GraphContainer />
      <NodeCustomizationPanel />
    </div>
  );
};

export default App;
