import { createSlice } from '@reduxjs/toolkit'
import { StockMovements } from 'utils/models/stockMovements'
import { configureBuilderGetAllMovements } from '../thunks/stockThunks'

export interface StockState {
  list : StockMovements[],
  isLoading : boolean,
  error : string | undefined
}

const initialState : StockState = {
  list: [],
  isLoading : false,
  error : undefined
}

export const stockHistorySlice = createSlice({
  name : 'stock',
  initialState,
  reducers : {
    thereWhereChanges(state) {
      state.list = []
    }
  },
  extraReducers : (builder) => {
    configureBuilderGetAllMovements(builder)
  }
})

export const { thereWhereChanges } = stockHistorySlice.actions
export default stockHistorySlice.reducer