import React from 'react'

const styles = {
  pageContainer: {
    maxWidth: '1284px',
    margin: '46px auto 16px'
  }
}

const PageOuterContainer = props =>
  <div style={styles.pageContainer}>
    {props.children}
  </div>

export default PageOuterContainer