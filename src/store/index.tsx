import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
