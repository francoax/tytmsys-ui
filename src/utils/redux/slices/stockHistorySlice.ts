import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { StockMovements } from 'utils/models/stockMovements'
import api from 'utils/services'

interface Stock {
  list : StockMovements[],
  isLoading : boolean,
  error : string | undefined
}

const initialState : Stock = {
  list: [],
  isLoading : false,
  error : undefined
}

export const getStockMovements = createAsyncThunk(
  'stock/movements',
  async () => {
    const response = await api.get('/items/movements')
    const data : StockMovements[] = response.data;
    return data
  }
)

export const stockHistorySlice = createSlice({
  name : 'stock',
  initialState,
  reducers : {
    // addStockMovements : (state, action) => {
    //   const stocks : StockMovements[] = action.payload
    //   state.list = stocks
    // },
    // setLoading : (state) => {
    //   state.isLoading = !state.isLoading
    // }
  },
  extraReducers : (builder) => {
    builder.addCase(getStockMovements.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getStockMovements.fulfilled, (state, action) => {
      state.isLoading = false
      state.list = action.payload
    })
    builder.addCase(getStockMovements.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  }
})

// export const {addStockMovements, setLoading} = stockHistorySlice.actions
export default stockHistorySlice.reducer