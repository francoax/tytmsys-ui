import React, { useEffect } from 'react'

import styles from './toast.module.css'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { closeToast, resetState } from 'utils/redux/slices/toastSlice'

const Toast = () => {

  const dispatch = useAppDispatch()

  const toastProps = useAppSelector((state) => state.toast)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(closeToast());
    }, 2500);
    return () => {
      clearTimeout(timer);
      dispatch(resetState());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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