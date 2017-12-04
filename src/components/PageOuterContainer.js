import React from 'react'

const styles = {
  pageContainer: {
    maxWidth: '1284px',
    margin: '64px auto 16px',
  }
}

const PageOuterContainer = ({ children }) =>
  <div style={styles.pageContainer}>
    {children}
  </div>

export default PageOuterContainer