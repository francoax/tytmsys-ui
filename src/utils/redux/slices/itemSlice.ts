import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Item, { onItemDeposit, onItemWithdraw } from 'utils/models/items';
import { setContent, showToast } from './toastSlice';
import ItemsService from 'utils/services/itemsService';
import { configureBuilderDeleteItem, configureBuilderGetItems } from '../thunks/itemsThunks';


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

export const addStock = createAsyncThunk(
  'items/deposit',
  async (deposit : onItemDeposit) => {
    return (await ItemsService.depositStock(deposit)).data.data
  }
)

export const retireStock = createAsyncThunk<any, any, {rejectValue : KnownError}>(
  'items/withdraw',
  async (withdraw : onItemWithdraw, { rejectWithValue, dispatch }) => {
    try {
      return (await ItemsService.retireStock(withdraw)).data.data
    } catch (err) {
      let error : AxiosError<KnownError> = err as any
      if(!error.response) {
        throw err
      }
      dispatch(setContent(error.response.data.message))
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

    builder.addCase(addStock.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addStock.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(addStock.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as KnownError
    })

    builder.addCase(retireStock.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(retireStock.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(retireStock.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as KnownError
    })
  }
})

export const { pushItem } = itemSlice.actions
export default itemSlice.reducer