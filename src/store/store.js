import { createStore } from "redux";
import { flightReducer } from "./reducers";

export const store = createStore(flightReducer);
