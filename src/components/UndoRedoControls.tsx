import React from 'react';
import { useDispatch } from 'react-redux';
import { undo, redo } from '../redux/graphSlice.ts'; // Import undo and redo actions from Redux

// UndoRedoControls component provides buttons for undo and redo actions
const UndoRedoControls: React.FC = () => {
  const dispatch = useDispatch(); // Initialize dispatch function to send actions to Redux store

  return (
    <div style={{ marginTop: '10px' }}>
      {/* Button for undoing the last action */}
      <button onClick={() => dispatch(undo())} style={{ marginRight: '5px' }}>
        Undo
      </button>

      {/* Button for redoing the previously undone action */}
      <button onClick={() => dispatch(redo())}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;
