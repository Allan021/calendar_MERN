import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { mainReducers } from "../reducers/mainReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  mainReducers,
  composeEnhancers(applyMiddleware(thunk))
);
