import { configureStore } from "@reduxjs/toolkit";  // Importing the configureStore function from Redux Toolkit
import graphReducer from "./graphSlice.ts";  // Importing the reducer for the graph state slice
import historyReducer from "./historySlice.ts";  // Importing the reducer for the history state slice

// Configuring the Redux store by combining the graph and history slices
export const store = configureStore({
  reducer: {
    graph: graphReducer,  // The reducer managing the graph state (nodes, edges, etc.)
    history: historyReducer,  // The reducer managing the undo/redo history state
  },
});

// Exporting RootState type which represents the full state structure of the store
export type RootState = ReturnType<typeof store.getState>;  // Get the type of the entire state from store

// Exporting AppDispatch type to type-check dispatch calls in the application
export type AppDispatch = typeof store.dispatch;  // Type for dispatch function
