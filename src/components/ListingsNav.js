import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  appBar: {
    position: 'fixed',
    top: '0'
  }
}

class ListingsNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          style={styles.appBar}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem onClick={this.handleClose}>Home</MenuItem>
          <MenuItem onClick={this.handleClose}>Popular</MenuItem>
        </Drawer>
      </div>
    )
  }
}

ListingsNav.propTypes = {
  title: PropTypes.string.isRequired
}

export default ListingsNav