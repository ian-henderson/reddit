import React from 'react'
import AppBar from 'material-ui/AppBar'

const styles = {
  appBar: {
    position: 'fixed'
  }
}

const Nav = () =>
  <AppBar
    title='Reddit'
    showMenuIconButton={false}
    style={styles.appBar}
  />

export default Nav