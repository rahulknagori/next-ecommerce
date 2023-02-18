import { configureStore } from "@reduxjs/toolkit";

import cartSliceReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
