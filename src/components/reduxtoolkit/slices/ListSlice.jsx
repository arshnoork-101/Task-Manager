// slices/ListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ListSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Push task and status as attributes to items to prevent data loss
    addItem(state, action) {
      state.items.push({
        task: action.payload.task,
        status: action.payload.status || "Pending", // Default to Pending if status is missing
      });
    },
    deleteItem(state, action) {
      state.items.splice(action.payload, 1);
    },
    clearAll(state) {
      state.items = [];
    },
    updateItem(state, action) {
      const { index, updatedTask, updatedStatus } = action.payload;
      if (updatedTask !== undefined) state.items[index].task = updatedTask;
      if (updatedStatus !== undefined) state.items[index].status = updatedStatus;
    },
  },
});

export const { addItem, deleteItem, clearAll, updateItem } = ListSlice.actions;
export default ListSlice.reducer;
