import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { grey300 } from 'material-ui/styles/colors'

const styles = {
  appBar: {
    position: 'fixed',
    top: '0px'
  },
  drawerAppBar: {
    borderBottom: `1px solid ${grey300}`,
    boxShadow: 'none'
  }
}

class Nav extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.goTo = this.goTo.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  goTo(target) {
    this.setState({ open: false })
    this.props.history.push(target)
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div>
        <AppBar
          style={styles.appBar}
          title={this.props.title}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={256}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}>
          <div>
            <AppBar
              style={styles.drawerAppBar}
              showMenuIconButton={false}
              title='Reddit'
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <List>
              <ListItem primaryText='Home' onClick={() => this.goTo('/')} />
              <ListItem primaryText='Popular' onClick={() => this.goTo('/r/popular')} />
              <ListItem primaryText='Subscriptions' disabled={true} />
              <ListItem primaryText='Log out' disabled={true} />
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withRouter(Nav)