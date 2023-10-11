import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Item, { onItemDeposit, onItemWithdraw } from 'utils/models/items';
import { setContent, showToast } from './toastSlice';
import ItemsService from 'utils/services/itemsService';
import { configureBuilderConfirmWithdraw, configureBuilderDeleteItem, configureBuilderGetItems, getItems } from '../thunks/itemsThunks';


type KnownError = {
  message : string,
  error : boolean
}
export interface ItemState {
  list : Item[]
  isLoading : boolean,
  error : KnownError | undefined
}

const initialState : ItemState = {
  list : [],
  isLoading : false,
  error: undefined
}

export const addStock = createAsyncThunk<any, any, {rejectValue : KnownError}>(
  'items/deposit',
  async (deposit : onItemDeposit, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await ItemsService.depositStock(deposit)
      const itemUpdated = await ItemsService.getById(data.data)

      dispatch(setContent({ content : data.message, status : 'ok'}))
      dispatch(showToast())
      return itemUpdated.data.data
    } catch (err) {
      let error : AxiosError<KnownError> = err as any
      if(!error.response) {
        throw err
      }
      dispatch(setContent({ content : error.response.data.message, status : 'error'}))
      dispatch(showToast())

      return rejectWithValue(error.response.data)
    }
  }
)

export const retireStock = createAsyncThunk<any, any, {rejectValue : KnownError}>(
  'items/withdraw',
  async (withdraw : onItemWithdraw, { rejectWithValue, dispatch }) => {
    try {
      const {data} = await ItemsService.retireStock(withdraw)
      const itemUpdated = await ItemsService.getById(data.data);

      dispatch(setContent({ content: data.message, status: 'ok' }));
      dispatch(showToast());
      return itemUpdated.data.data;
    } catch (err) {
      let error : AxiosError<KnownError> = err as any
      if(!error.response) {
        throw err
      }
      dispatch(setContent({ content : error.response.data.message, status : 'error'}))
      dispatch(showToast())

      return rejectWithValue(error.response.data)
    }
  }
)

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    pushItem : (state, action) => {
      state.list.push(action.payload)
    }
  },
  extraReducers : (builder) => {
    configureBuilderGetItems(builder)

    configureBuilderDeleteItem(builder)

    configureBuilderConfirmWithdraw(builder)

    builder.addCase(addStock.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addStock.fulfilled, (state, action) => {
      state.isLoading = false
      const itemUpdated = action.payload as Item
      const index = state.list.map(i => i.id).indexOf(itemUpdated.id)
      state.list[index] = itemUpdated
    })
    builder.addCase(addStock.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as KnownError
    })

    builder.addCase(retireStock.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(retireStock.fulfilled, (state, action) => {
      state.isLoading = false
      const itemUpdated = action.payload as Item;
      const index = state.list.map((i) => i.id).indexOf(itemUpdated.id);
      state.list[index] = itemUpdated;
    })
    builder.addCase(retireStock.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as KnownError
    })
  }
})

export const { pushItem } = itemSlice.actions
export default itemSlice.reducer