import React from 'react'

const styles = {
  pageContainer: {
    padding: '76px 12px 24px'
  }
}

const PageContainer = ({ children }) =>
  <div style={styles.pageContainer}>
    {children}
  </div>

export default PageContainer