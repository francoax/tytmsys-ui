import React, { useEffect } from 'react'

import styles from './toast.module.css'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { closeToast } from 'utils/redux/slices/toastSlice'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const Toast = () => {

  const dispatch = useAppDispatch()

  const toastProps = useAppSelector((state) => state.toast)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(closeToast());
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {createPortal(
        <Stack className={styles.toast} spacing={2}>
          <Alert variant="filled" className={styles.content} severity={ toastProps.status === 'error' ? 'error' : 'success'}>
              <p>{toastProps.content}</p>
          </Alert>
        </Stack>
        // <div className={styles.toast}>
        //   <div className={styles.content}>
        //     <p>{toastProps.content}</p>
        //     <span style={{'cursor' : 'pointer'}} onClick={() => dispatch(closeToast())}>&times;</span>
        //   </div>
        // </div>
      ,
      document.body)}
    </>
  )
}

export default Toast