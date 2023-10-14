import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import SuppliersService from "utils/services/suppliersService";
import { SupplierState } from "../slices/supplierSlice";
import { KnownError } from "utils/models/commons";
import { Supplier, SupplierAgent } from "utils/models/supplier";
import { setContent, showToast } from "../slices/toastSlice";

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

export const createSupplier = createAsyncThunk(
  'suppliers/new',
  async (supplier : SupplierAgent, { dispatch }) => {
    try {
      const { data } = await SuppliersService.postSupplier(supplier)

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast())

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateSupplier = createAsyncThunk(
  'suppliers/edit',
  async (supplier : SupplierAgent, { dispatch }) => {
    try {
      const { data } = await SuppliersService.putSupplier(supplier)

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast());

      return data.data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteSupplier = createAsyncThunk(
  'suppliers/delete',
  async (id : number, { dispatch }) => {
    try {
      const { data } = await SuppliersService.deleteSupplier(id)

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast());

      return id
    } catch (error) {
      console.log(error)
    }
  }
)

export const configureBuilderGetSuppliers = (
    builder : ActionReducerMapBuilder<SupplierState>
  ) => {
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

export const configureBuilderCreateSupplier = (
  builder: ActionReducerMapBuilder<SupplierState>
) => {
  builder.addCase(createSupplier.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createSupplier.fulfilled, (state, action) => {
    state.isLoading = false;
    state.list.push(action.payload)
  });
  builder.addCase(createSupplier.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as KnownError;
  });
}

export const configureBuilderUpdateSupplier= (
  builder: ActionReducerMapBuilder<SupplierState>
) => {
  builder.addCase(updateSupplier.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(updateSupplier.fulfilled, (state, action) => {
    state.isLoading = false;
    const supplierUpdated = action.payload as Supplier;
    const index = state.list.map((i) => i.id).indexOf(supplierUpdated.id);
    state.list[index] = supplierUpdated;
  });
  builder.addCase(updateSupplier.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as KnownError;
  });
}

export const configureBuilderDeleteSupplier = (
  builder: ActionReducerMapBuilder<SupplierState>
) => {
  builder.addCase(deleteSupplier.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(deleteSupplier.fulfilled, (state, action) => {
    state.isLoading = false;
    state.list = state.list.filter(s => s.id !== action.payload)
  });
  builder.addCase(deleteSupplier.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as KnownError;
  });
};
