import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const styles = {
  container: {
    position: 'relative'
  },
  refresh: {
    marginLeft: '50%',
    marginTop: '30px'
  }
}

const Loading = () =>
  <div style={styles.container}>
    <RefreshIndicator
      size={40}
      left={-20}
      top={10}
      status='loading'
      style={styles.refresh}
    />
  </div>

export default Loading