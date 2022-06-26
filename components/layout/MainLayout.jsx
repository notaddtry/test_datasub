import React from 'react'
import styles from './layout.module.scss'

const MainLayout = ({ children }) => {
  return <main className={styles.main}>{children}</main>
}

export default MainLayout
