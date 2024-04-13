import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import FashionReducer from "./FashionReducer";

const rootReducers = combineReducers({ Fashions: FashionReducer });

const store = configureStore({
  reducer: rootReducers,
});

export default store;
