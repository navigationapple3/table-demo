import { Reducer } from "redux";
import {
  type TableState,
  type Action,
  ActionTypes,
} from "./types";

const initialState: TableState = {
  columns: [],
  dataset: [],
  total: 0,
  loading: false,
  visible: false,
  inputs: {
    title: "",
    width: 150,
    key: "",
    dataIndex: "",
  },
  addOnColumns:
    localStorage.getItem("table_add_on_columns") != null
      ? JSON.parse(localStorage.getItem("table_add_on_columns"))
      : [],
  searchText: "",
};

const tableReducer: Reducer<TableState, Action> = (
  state = initialState,
  action,
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
    case ActionTypes.OPEN_DRAWER:
      return {
        ...state,
        visible: true,
        inputs: initialState.inputs,
      };
    case ActionTypes.CLOSE_DRAWER:
      return {
        ...state,
        visible: false,
        inputs: initialState.inputs,
      };
    case ActionTypes.SET_DRAWER_INPUT:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.type]: action.payload.value,
        },
      };
    case ActionTypes.ADD_COLUMN:
      return {
        ...state,
        addOnColumns: [...state.addOnColumns, state.inputs],
        visible: false,
        inputs: initialState.inputs,
      };
    case ActionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};

export default tableReducer;
