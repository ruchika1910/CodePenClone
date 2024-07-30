import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";

const store = configureStore({
  reducer: myReducer
});

export default store;
