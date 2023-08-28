import React, { useEffect } from 'react'

import styles from './toast.module.css'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { closeToast, resetState } from 'utils/redux/slices/toastSlice'

const Toast = () => {

  const dispatch = useAppDispatch()

  const toastProps = useAppSelector((state) => state.toast)

  useEffect(() => {
    setTimeout(() => dispatch(resetState()), 2500)
  }, [dispatch])

  if(!toastProps.isShown) {
    return null
  }

  return (
    <>
      {createPortal(
        <div className={styles.toast}>
          <div className={styles.content}>
            <p>{toastProps.content}</p>
            <span style={{'cursor' : 'pointer'}} onClick={() => dispatch(closeToast())}>&times;</span>
          </div>
        </div>
      ,
      document.body)}
    </>
  )
}

export default Toast