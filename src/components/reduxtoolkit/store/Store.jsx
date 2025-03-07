import { configureStore } from '@reduxjs/toolkit';
import ListSlice from "../slices/ListSlice";

const Store = configureStore({
  reducer: {
    cart: ListSlice,
  },
});

export default Store;