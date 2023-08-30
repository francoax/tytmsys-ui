import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './layout.module.css'

import Modal from 'components/common/modal'
import Toast from 'components/common/toast'
import Sidebar from './navigation'

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <footer className={styles.footer}>
        <p className={styles.copy}>TyT S.H Copyright &copy; 2023</p>
      </footer>
      <Modal />
      <Toast />
    </>
  )
}

export default Layout