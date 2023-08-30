import { createSlice } from "@reduxjs/toolkit";
import Category from "utils/models/categories";
import { KnownError } from "utils/models/commons";
import { configureBuilderGet } from "../thunks/categoriesThunks";

export interface CategoryState {
  list : Category[],
  isLoading : boolean,
  error : KnownError | undefined
}

const initialState : CategoryState = {
  list : [],
  isLoading : false,
  error : undefined
}

export const categorySlice = createSlice({
  name : 'category',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    configureBuilderGet(builder)
  }
})

export default categorySlice.reducer