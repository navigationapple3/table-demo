import { supabase } from "../../db/supabase";
import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export const pageAndSizeToRange = (
  page: number,
  size: number
): [number, number] => {
  const start = (page - 1) * size;
  const end = page * size - 1;
  return [start, end];
};

export const fetchProduct = async (
  dispatch: Dispatch,
  page: number,
  size: number
) => {
  try {
    const [start, end] = pageAndSizeToRange(page, size);

    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: true,
    });

    const result = await supabase.from("products").select().range(start, end);

    const total = 220000;

    dispatch({
      type: ActionTypes.SET_DATASET,
      payload: {
        dataset: result.data,
        total,
      },
    });

    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: false,
    });
  }
};

export const updateProduct = () => {
  try {
  } catch (e) {}
};

export const deleteProduct = () => {
  try {
  } catch (e) {}
};

export const addProduct = () => {
  try {
  } catch (e) {}
};
