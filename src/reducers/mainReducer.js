import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendar";
import { uiReducer } from "./uiReducer";

export const mainReducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer,
});
