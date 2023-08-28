import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ItemsResponse, { onDeposit, Item, onWithdraw } from 'utils/interfaces/items';
import api from 'utils/services';
import { setContent, showToast } from './toastSlice';

interface ItemState {
  list : Item[]
  isLoading : boolean,
  error : KnownError | undefined
}

const initialState : ItemState = {
  list : [],
  isLoading : false,
  error: undefined
}

export const getItems = createAsyncThunk(
  'items/list',
  async () => {
    const response = await api.get('/items')
    const data : ItemsResponse = response.data
    return data.data
  }
)

export const addStock = createAsyncThunk(
  'items/deposit',
  async (deposit : onDeposit) => {
    const response = await api.post(`/items/movements/deposit/${deposit.id}`, {
      amount : deposit.amount,
      dollarAtDate : deposit.dollarAtDate,
      totalPrice : deposit.totalPrice
    })
    const data = response.data
    return data
  }
)

interface KnownError {
  message : string,
  error : boolean
}

export const retireStock = createAsyncThunk<any, any, {rejectValue : KnownError}>(
  'items/withdraw',
  async (deposit : onWithdraw, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`/items/movements/withdraw/${deposit.id}`, {
      amount : deposit.amount,
      })

      const data = response.data
      return data
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
    // addItems : (state, action) => {
    //   const items : Item[] = action.payload;
    //   state.list = items;
    // },
    // setLoading : (state) => {
    //   state.isLoading = !state.isLoading;
    // }
  },
  extraReducers : (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload
    })
    builder.addCase(getItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error as KnownError
    })

    builder.addCase(addStock.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addStock.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(addStock.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error as KnownError
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

// export const { addItems, setLoading } = itemSlice.actions
export default itemSlice.reducer