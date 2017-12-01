import React from 'react'

const styles = {
  container: {
    maxWidth: '1190px',
    padding: '64px 14px 15px'
  }
}

const PageContainer = ({ children }) =>
  <div style={styles.container}>
    {children}
  </div>

export default PageContainer