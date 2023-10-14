import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import SuppliersService from "utils/services/suppliersService";
import { SupplierState } from "../slices/supplierSlice";
import { KnownError } from "utils/models/commons";

export const getSuppliers = createAsyncThunk(
  'suppliers/list',
  async () => {
    try {
      const { data } = await SuppliersService.getSuppliers()

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const configureBuilderGetSuppliers = (builder : ActionReducerMapBuilder<SupplierState>) => {
  builder.addCase(getSuppliers.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(getSuppliers.fulfilled, (state, action) => {
    state.isLoading = false
    state.list = action.payload
  })
  builder.addCase(getSuppliers.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}