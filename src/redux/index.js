import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import FashionReducer from "./FashionReducer";
import HistoryReducer from "./HistoryReducer";

const rootReducers = combineReducers({
  Fashions: FashionReducer,
  Histories: HistoryReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
