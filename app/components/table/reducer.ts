import { Reducer } from "redux";
import { type TableState, type Action, ActionTypes } from "./types";

const initialState: TableState = {
  columns: [],
  dataset: [],
  total: 0,
  loading: false,
};

const tableReducer: Reducer<TableState, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };
    case ActionTypes.SET_DATASET:
      return {
        ...state,
        dataset: action.payload.dataset,
        total: action.payload.total,
      };
    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default tableReducer;
