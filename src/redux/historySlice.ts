import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for Action object, defining the structure of each action with type and payload
interface Action {
  type: string;
  payload: any;
}

// Interface for the HistoryState, which tracks the past, present, and future states of actions
interface HistoryState {
  past: Action[];  // Array to store past actions for undo functionality
  present: any;  // Current state (the most recent action)
  future: Action[];  // Array to store future actions for redo functionality
}

// Initial state setup with empty past and future actions and no present action
const initialState: HistoryState = {
  past: [],
  present: null,
  future: [],
};

// Creating a Redux slice for managing history actions like undo/redo
const historySlice = createSlice({
  name: "history",  // Slice name
  initialState,  // The initial state of the history
  reducers: {
    // Reducer to add a new action to the history, push the current state to the past, and clear the future
    addAction: (state, action: PayloadAction<Action>) => {
      state.past.push(state.present);  // Save the current action to the past before applying the new action
      state.present = action.payload;  // Set the present action as the current state
      state.future = [];  // Clear the future since a new action has been added
    },
    
    // Reducer for undo functionality, moves the last action from past to present, and saves the current state to future
    undoAction: (state) => {
      if (state.past.length > 0) {  // Ensure there is something in the past to undo
        state.future.unshift(state.present);  // Save the current state to the future
        state.present = state.past.pop()!;  // Pop the last action from the past and set it as present
      }
    },

    // Reducer for redo functionality, moves the last undone action from future to present, and saves the current state to past
    redoAction: (state) => {
      if (state.future.length > 0) {  // Ensure there is something in the future to redo
        state.past.push(state.present);  // Save the current state to the past
        state.present = state.future.shift()!;  // Shift the first action from future and set it as present
      }
    },
  },
});

// Exporting the actions that can be dispatched to update the state
export const { addAction, undoAction, redoAction } = historySlice.actions;

// Exporting the reducer for use in the Redux store
export default historySlice.reducer;
