import { notification } from "antd";
import { supabase } from "../../db/supabase";
import { ActionTypes, ProductInfo } from "./types";
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
  size: number,
  searchText: string
) => {
  try {
    const [start, end] = pageAndSizeToRange(page, size);

    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: true,
    });

    const result = await supabase
      .from("products")
      .select()
      .or(`asin.ilike.%${searchText}%, title.ilike.%${searchText}%`)
      .order("asin", { ascending: false })
      .range(start, end);

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

export const updateProduct = async (id: string, title: string) => {
  try {
    await supabase.from("products").update({ title }).eq("id", id);

    notification.success({
      message: "Update Success",
    });
  } catch (e) {
    notification.error({
      message: e?.message,
    });
  }
};

export const updateProductImage = async (id: string, image: string) => {
  try {
    await supabase.from("products").update({ imgUrl: image }).eq("id", id);

    notification.success({
      message: "Update Image Success",
    });
  } catch (e) {
    notification.error({
      message: e?.message,
    });
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await supabase.from("products").delete().eq("id", id);

    notification.success({
      message: "Delete Success",
    });
  } catch (e) {
    notification.error({
      message: e?.message,
    });
  }
};

export const addProduct = async (record: ProductInfo) => {
  try {
    await supabase.from("products").insert(record);

    notification.success({
      message: "Insert Success",
    });
  } catch (e) {}
};
