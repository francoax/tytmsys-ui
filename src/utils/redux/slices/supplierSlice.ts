import { createSlice } from "@reduxjs/toolkit";
import { KnownError } from "utils/models/commons";
import { Supplier } from "utils/models/supplier";
import { configureBuilderGetSuppliers } from "../thunks/suppliersThunks";

export interface SupplierState {
  list : Supplier[],
  isLoading : boolean,
  error : KnownError | undefined
}

const initialState : SupplierState = {
  list : [],
  isLoading : false,
  error : undefined
}

export const supplierSlice = createSlice({
  name : 'supplier',
  initialState,
  reducers : {},
  extraReducers : (builder) => {
    configureBuilderGetSuppliers(builder)
  }
})

export default supplierSlice.reducer