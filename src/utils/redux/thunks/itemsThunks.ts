import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import Item, { ItemAgent } from "utils/models/items";
import ItemsService from "utils/services/itemsService";
import { ItemState, pushItem } from "../slices/itemSlice";
import { KnownError } from "utils/models/commons";
import { setContent, showToast } from "../slices/toastSlice";

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

export const postItem = createAsyncThunk(
  'items/add/newItem',
  async (item : ItemAgent, { dispatch }) => {
    try {
      const { data } = await ItemsService.createItem(item)

      dispatch(pushItem(data.data))

      dispatch(setContent(data.message))
      dispatch(showToast())

      return data
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