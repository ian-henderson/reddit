import React from 'react'
import Card from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'

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
    <Divider />
    <CircularProgress
      style={styles.circularProgress}
      size={25}
      thickness={3.0}
    />
    <Divider />
  </Card>

export default Loading