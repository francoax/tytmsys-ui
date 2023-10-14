import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import ItemsService from "utils/services/itemsService";
import { StockState } from "../slices/stockSlice";

export const getMovements = createAsyncThunk(
  'movements/list',
  async () => {
    try {
      const { data } = await ItemsService.getAllMovements()

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const configureBuilderGetAllMovements = (builder : ActionReducerMapBuilder<StockState>) => {
  builder.addCase(getMovements.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(getMovements.fulfilled, (state, action) => {
    state.isLoading = false
    state.list = action.payload
  })
  builder.addCase(getMovements.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.error.message
  })
}