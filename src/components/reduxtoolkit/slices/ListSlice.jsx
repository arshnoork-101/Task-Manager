import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push({ task: action.payload, status: "Pending" });
      localStorage.setItem("tasks", JSON.stringify(state.items)); // Save to localStorage
    },
    deleteItem(state, action) {
      state.items.splice(action.payload, 1);
      localStorage.setItem("tasks", JSON.stringify(state.items)); // Save to localStorage
    },
    clearAll(state) {
      state.items = [];
      localStorage.removeItem("tasks"); // Clear localStorage
    },
    updateItem(state, action) {
      const { index, updatedTask, updatedStatus } = action.payload;
      if (updatedTask !== undefined) {
        state.items[index].task = updatedTask;
      }
      if (updatedStatus !== undefined) {
        state.items[index].status = updatedStatus;
      }
      localStorage.setItem("tasks", JSON.stringify(state.items)); // Save to localStorage
    },
  },
});

export const { addItem, deleteItem, clearAll, updateItem } = ListSlice.actions;
export default ListSlice.reducer;
