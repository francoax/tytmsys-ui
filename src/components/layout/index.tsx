import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import styles from './layout.module.css'

import Modal from 'components/common/modal'
import Toast from 'components/common/toast'

const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <img src="/assets/images/logo.jpg" alt="" />
        <nav className={styles.navbar}>
          <ul className={styles.optionsContainer}>
            <li className={styles.option}><NavLink to="/" className={({isActive}) => isActive ? styles.activeOption : ''}>Productos</NavLink></li>
            <li className={styles.option}><NavLink  to="/historial" className={({isActive}) => isActive ? styles.activeOption : ''}>Historial de stock</NavLink></li>
          </ul>
        </nav>
      </header>
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