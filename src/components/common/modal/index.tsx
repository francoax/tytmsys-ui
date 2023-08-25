import React from 'react'
import {createPortal} from 'react-dom'

import styles from './modal.module.css'
import { closeModal } from 'utils/redux/slices/modalSlice'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import Button from '@mui/material/Button'


const Modal = () => {

  const dispatch = useAppDispatch();

  const modalProp = useAppSelector((state) => state.modal);

  if(!modalProp.isShown) {
    return null
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
                <Button sx={{backgroundColor : 'gray'}} variant='contained'>Aceptar</Button>
                <Button onClick={() => dispatch(closeModal())} variant='contained'>Cancelar</Button>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  )
}

export default Modal