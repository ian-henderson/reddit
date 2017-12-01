import React from 'react'
import AppBar from 'material-ui/AppBar'

const styles = {
  appBar: {
    'position': 'fixed',
    'top': '0'
  }
}

const Nav = () =>
  <AppBar
    title='Reddit'
    style={styles.appBar}
    showMenuIconButton={false}
  />

export default Nav