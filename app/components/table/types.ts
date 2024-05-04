import type { ColumnsType } from "antd/es/table";

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface DataItem {
  [key: string]: any;
}

export interface TableState {
  columns: ColumnsType[];
  dataset: DataItem[];
  total: number;
  loading: boolean;
}

// 定义 action 类型
export enum ActionTypes {
  SET_COLUMNS = "table/SET_COLUMNS",
  SET_DATASET = "table/SET_DATASET",
  SET_PAGINATION = "table/SET_PAGINATION",
  SET_LOADING = "table/SET_LOADING",
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

export type Action = SetColumnsAction | SetDatasetAction | SetPaginationAction | SetLoadingAction;
