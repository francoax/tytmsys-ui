import { configureStore } from "@reduxjs/toolkit"

// data storage
import itemReducer from '../redux/slices/itemSlice'
import stockReducer from '../redux/slices/stockHistorySlice'
import categoryReducer from '../redux/slices/categorySlice'

// components
import toastReducer from '../redux/slices/toastSlice'
import modalReducer from '../redux/slices/modalSlice'

const store = configureStore({
  reducer : {
    items : itemReducer,
    stocks : stockReducer,
    categories : categoryReducer,
    toast : toastReducer,
    modal : modalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store