import React from 'react'
import PropTypes from 'prop-types'

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

PageOuterContainer.propTypes = {
  children: PropTypes.object.isRequired
}

export default PageOuterContainer