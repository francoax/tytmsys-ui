import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesService from "utils/services/categoriesService";
import { CategoryState } from "../slices/categorySlice";
import { KnownError } from "utils/models/commons";
import Category from "utils/models/categories";

export const getCategories = createAsyncThunk(
  'categories/list',
  async () => {
    try {
      const { data } = await CategoriesService.getCategories()
      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const configureBuilderGet = (builder : ActionReducerMapBuilder<CategoryState>) => {
  builder.addCase(getCategories.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.isLoading = false
    state.list = action.payload as Category[]
  })
  builder.addCase(getCategories.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}