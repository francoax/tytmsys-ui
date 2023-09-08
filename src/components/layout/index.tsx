import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './layout.module.css'

import Modal from 'components/common/modal'
import Toast from 'components/common/toast'
import Sidebar from './navigation'
import { useAppSelector } from 'utils/redux/hooks'

const Layout = () => {

  const toastProps = useAppSelector((state) => state.toast)

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Modal />
      {toastProps.isShown && <Toast />}
    </>
  )
}

export default Layout