import { configureStore } from "@reduxjs/toolkit";

import itemReducer from '../redux/slices/itemSlice';
import stockReducer from '../redux/slices/stockHistorySlice';
import toastReducer from '../redux/slices/toastSlice'
import modalReducer from '../redux/slices/modalSlice'

const store = configureStore({
  reducer : {
    items : itemReducer,
    stocks : stockReducer,
    toast : toastReducer,
    modal : modalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store