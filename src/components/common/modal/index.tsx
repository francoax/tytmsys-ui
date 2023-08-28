import React from 'react'
import {createPortal} from 'react-dom'

import styles from './modal.module.css'
import { closeModal } from 'utils/redux/slices/modalSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import Button from '@mui/material/Button'
import { AnyAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'


const Modal = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalProp = useAppSelector((state) => state.modal);

  if(!modalProp.isShown) {
    return null
  }

  const handleClick = () => {
    dispatch(modalProp.action as AnyAction)
    dispatch(closeModal())
    setTimeout(() => navigate(-1), 500)
  }

  return (
    <>
      {createPortal(
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              <p>{modalProp.title.toUpperCase()}</p>
              <span style={{'cursor' : 'pointer'}} onClick={() => dispatch(closeModal())}>&times;</span>
            </div>
            <p className={styles.modalContent}>{modalProp.message}</p>
            <div className={styles.buttonsContainer}>
                <Button onClick={() => handleClick()} sx={{backgroundColor : 'gray'}} variant='contained'>Aceptar</Button>
                <Button onClick={() => dispatch(closeModal())} variant='contained'>Cancelar</Button>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  )
}

export default Modal