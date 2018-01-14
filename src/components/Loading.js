import React from 'react'
import Card from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  card: {
    borderRadius: '0',
    boxShadow: '0',
    position: 'relative',
    textAlign: 'center'
  },
  circularProgress: {
    margin: '15px auto'
  }
}

const Loading = () =>
  <Card style={styles.card}>
    <CircularProgress
      style={styles.circularProgress}
      size={20}
      thickness={2.5}
    />
  </Card>

export default Loading