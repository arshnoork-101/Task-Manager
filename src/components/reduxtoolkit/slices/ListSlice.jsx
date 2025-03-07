// slices/ListSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ListSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    deleteItem(state, action) {
      state.items.splice(action.payload, 1);
    },
    clearAll(state) {
      state.items = [];
    },
    updateItem(state, action) {
      const { index, updatedTask } = action.payload;
      state.items[index] = updatedTask;
    },
  },
});

export const { addItem, deleteItem, clearAll, updateItem } = ListSlice.actions;
export default ListSlice.reducer;
