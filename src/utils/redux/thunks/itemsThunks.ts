import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import Item from "utils/models/items";
import ItemsService from "utils/services/itemsService";
import { ItemState } from "../slices/itemSlice";
import { KnownError } from "utils/models/commons";

export const getItems = createAsyncThunk(
  'items/list',
  async () => {
    try {
      const { data } = await ItemsService.getItems()

      return data.data as Item[]
    } catch (error) {
      console.log(error)
    }
  }
)

export const configureBuilderGetItems = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(getItems.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(getItems.fulfilled, (state, action) => {
    state.isLoading = false
    state.list = action.payload as Item[]
  })
  builder.addCase(getItems.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}