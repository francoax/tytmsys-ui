import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Modal {
  title : string,
  message : string,
  isShown? : boolean
}

const initialState : Modal = {
  title : '',
  message : '',
  isShown : false
}

export const modalSlice = createSlice({
  name : 'modal',
  initialState,
  reducers : {
    showModal : (state) => {
      state.isShown = true;
    },
    closeModal : (state) => {
      state.isShown = false;
    },
    setModalContent : (state, { payload} : PayloadAction<Modal>) => {
      state.message = payload.message
      state.title = payload.title
    }
  }
})

export const { showModal, closeModal, setModalContent } = modalSlice.actions
export default modalSlice.reducer