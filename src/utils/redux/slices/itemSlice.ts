import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ItemsResponse, { Item } from 'utils/interfaces/items';
import api from 'utils/services';

interface ItemState {
  list : Item[]
  isLoading : boolean,
  error : string | undefined
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
      state.error = action.error.message
    })
  }
})

// export const { addItems, setLoading } = itemSlice.actions
export default itemSlice.reducer