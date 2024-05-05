import type { ColumnsType } from "antd/es/table";

export interface ProductInfo {
  asin: string;
  boughtInLastMonth: number;
  category_id: string;
  created_at: string;
  id: string;
  imgUrl: string;
  isBestSeller: boolean;
  listPrice: number;
  price: number;
  productURL: string;
  reviews: number;
  stars: number;
  title: string;
  updated_at: string;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface TableState {
  columns: ColumnsType[];
  dataset: ProductInfo[];
  total: number;
  loading: boolean;
  visible: boolean;
  inputs: DrawerInput;
  addOnColumns: ColumnsType[];
  searchText: string;
}

export interface DrawerInput {
  title: string;
  width: number;
  key: string;
  dataIndex: string;
}

export interface DrawerState {
  visible: boolean;
  inputs: DrawerInput;
}

export enum ActionTypes {
  SET_COLUMNS = "table/SET_COLUMNS",
  SET_DATASET = "table/SET_DATASET",
  SET_PAGINATION = "table/SET_PAGINATION",
  SET_LOADING = "table/SET_LOADING",
  OPEN_DRAWER = "table/OPEN_DRAWER",
  CLOSE_DRAWER = "table/CLOSE_DRAWER",
  SET_DRAWER_INPUT = "table/SET_DRAWER_INPUT",
  ADD_COLUMN = "table/ADD_COLUMN",
  SET_SEARCH_TEXT = "table/SET_SEARCH_TEXT",
}

interface SetColumnsAction {
  type: ActionTypes.SET_COLUMNS;
  payload: ColumnsType[];
}

interface SetDatasetAction {
  type: ActionTypes.SET_DATASET;
  payload: {
    dataset: [];
    total: number;
  };
}

interface SetPaginationAction {
  type: ActionTypes.SET_PAGINATION;
  payload: Pagination;
}

interface SetLoadingAction {
  type: ActionTypes.SET_LOADING;
  payload: boolean;
}
interface OpenDrawerAction {
  type: ActionTypes.OPEN_DRAWER;
}

interface CloseDrawerAction {
  type: ActionTypes.CLOSE_DRAWER;
}

interface SetDrawerInputAction {
  type: ActionTypes.SET_DRAWER_INPUT;
  payload: {
    type: string;
    value: string;
  };
}

interface AddColumnAction {
  type: ActionTypes.ADD_COLUMN;
}

interface SetSearchTextAction {
  type: ActionTypes.SET_SEARCH_TEXT;
  payload: string;
}

export const setColumns = (columns: ColumnsType[]): SetColumnsAction => ({
  type: ActionTypes.SET_COLUMNS,
  payload: columns,
});

export const setDataset = (dataset: [], total: number): SetDatasetAction => ({
  type: ActionTypes.SET_DATASET,
  payload: {
    dataset,
    total,
  },
});

export const setPagination = (pagination: Pagination): SetPaginationAction => ({
  type: ActionTypes.SET_PAGINATION,
  payload: pagination,
});

export const setLoading = (loading: boolean): SetLoadingAction => ({
  type: ActionTypes.SET_LOADING,
  payload: loading,
});

export const setSearchText = (text: string) => ({
  type: ActionTypes.SET_SEARCH_TEXT,
  payload: text,
});

export type Action =
  | SetColumnsAction
  | SetDatasetAction
  | SetPaginationAction
  | SetLoadingAction
  | OpenDrawerAction
  | CloseDrawerAction
  | SetDrawerInputAction
  | AddColumnAction
  | SetSearchTextAction;
