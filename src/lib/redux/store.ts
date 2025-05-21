import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import selectMenuSlice from "../selectMenu/SelectMenu";
const store = configureStore({
  reducer: {
    profileReducer,
    selectMenuSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
