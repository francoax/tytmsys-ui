import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  isShown : boolean,
  content : string,
  status : string
}

const initialState : ToastState = {
  isShown : false,
  content : '',
  status : ''
}

export const toastSilce = createSlice({
  name : 'toast',
  initialState,
  reducers : {
    resetState : (state) => {
      state.content = initialState.content
      state.isShown = initialState.isShown
    },
    showToast : (state) => {
      state.isShown = true
    },
    closeToast : (state) => {
      state.isShown = false
    },
    setContent : (state, action) => {
      state.content = action.payload.content
      state.status = action.payload.status
    }
  }
})

export const {resetState, showToast, closeToast, setContent} = toastSilce.actions
export default toastSilce.reducer