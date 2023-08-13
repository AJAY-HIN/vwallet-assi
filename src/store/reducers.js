import { createReducer } from "reduxsauce";
import { Types } from "./actions";

const INITIAL_STATE = {
  flightData: [],
  loading: false,
};

export const getData = (state = INITIAL_STATE, action) => {
  console.log(action.payload, "====");
  return {
    ...state,
  };
};

const HANDLERS = { [Types.GET_DATA]: getData };
export const flightReducer = createReducer(INITIAL_STATE, HANDLERS);
