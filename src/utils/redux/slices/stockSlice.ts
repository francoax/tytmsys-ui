import { createSlice } from '@reduxjs/toolkit'
import { StockMovements } from 'utils/models/stockMovements'

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

export const stockHistorySlice = createSlice({
  name : 'stock',
  initialState,
  reducers : {},
  extraReducers : (builder) => {}
})

export default stockHistorySlice.reducer