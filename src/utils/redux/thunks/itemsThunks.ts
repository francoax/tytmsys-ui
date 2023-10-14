import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import Item, { ItemAgent } from "utils/models/items";
import ItemsService from "utils/services/itemsService";
import { ItemState } from "../slices/itemSlice";
import { KnownError } from "utils/models/commons";
import { setContent, showToast } from "../slices/toastSlice";
import { ConfirmWithdraw } from "utils/models/stockMovements";
import { thereWhereChanges } from "../slices/stockSlice";

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

      dispatch(setContent({ content: data.message, status: 'ok'}))
      dispatch(showToast())

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateItem = createAsyncThunk(
  'items/edit/item',
  async (item : ItemAgent, { dispatch }) => {
    try {
      const { data } = await ItemsService.updateItem(item, item.id)

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast());

      dispatch(thereWhereChanges());

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteItem = createAsyncThunk(
  'item/delete',
  async (id : number, { dispatch }) => {
    try {
      const { data } = await ItemsService.deleteItem(id)

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast())

      dispatch(thereWhereChanges());

      return data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const confirmWithdraw = createAsyncThunk(
  'item/confirmWithdraw',
  async (confirm : ConfirmWithdraw, { dispatch }) => {
    try {
      const { data } = await ItemsService.confirmWithdraw(confirm.id ? confirm.id : 0, confirm.realAmountUsed)
      const itemUpdated = await ItemsService.getById(data.data)

      dispatch(setContent({ content : data.message, status : 'ok'}))
      dispatch(showToast())

      dispatch(thereWhereChanges())

      return itemUpdated.data.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateItemInfo = createAsyncThunk(
  'item/updateInfo',
  async (id : number, { dispatch }) => {
    try {
      const { data } = await ItemsService.getById(id)

      dispatch(thereWhereChanges());

      return data.data
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
    state.list = [...(action.payload as Item[])];
  })
  builder.addCase(getItems.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}

export const configureBuilderPostItem = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(postItem.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(postItem.fulfilled, (state, action) => {
    state.isLoading = false
    state.list.push(action.payload)
  })
  builder.addCase(postItem.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}

export const configureBuilderUpdateItem = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(updateItem.pending, (state) => {
    state.isLoading = true
  })
  builder.addCase(updateItem.fulfilled, (state, action) => {
    state.isLoading = false
    const itemUpdated = action.payload as Item
    const index = state.list.map((i) => i.id).indexOf(itemUpdated.id);
    state.list[index] = itemUpdated;
  })
  builder.addCase(updateItem.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}

export const configureBuilderDeleteItem = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(deleteItem.pending, (state) => {
    state.isLoading = true
  })

  builder.addCase(deleteItem.fulfilled, (state, action) => {
    state.isLoading = false
    const idDeleted = action.payload as number
    state.list = state.list.filter(i => i.id !== idDeleted)
  })

  builder.addCase(deleteItem.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
}

export const configureBuilderConfirmWithdraw = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(confirmWithdraw.pending, (state) => {
    state.isLoading = true
  })

  builder.addCase(confirmWithdraw.fulfilled, (state, action) => {
    state.isLoading = false
    const item = action.payload as Item
    const index = state.list.map((i) => i.id).indexOf(item.id);
    state.list[index] = item
  })

  builder.addCase(confirmWithdraw.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload as KnownError
  })
};

export const configureBuilderUpdateItemInfo = (builder : ActionReducerMapBuilder<ItemState>) => {
  builder.addCase(updateItemInfo.fulfilled, (state, action) => {
    const itemInfoUpdated = action.payload as Item
    const index = state.list.map(i => i.id).indexOf(itemInfoUpdated.id)
    state.list[index] = itemInfoUpdated
  })
}