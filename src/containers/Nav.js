import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'

const styles = {
  appBar: {
    fontFamily: "'Roboto Mono', monospace",
    position: 'fixed',
    top: '0px'
  },
  appBarTitle: {
    fontSize: '18px'
  },
  appBarDrawer: {
    fontFamily: "'Roboto Mono', monospace",
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
          titleStyle={styles.appBarTitle}
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
              style={styles.appBarDrawer}
              titleStyle={styles.appBarTitle}
              title='reddit'
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <List>
              <ListItem primaryText='Home' onClick={() => this.goTo('/')} />
              <ListItem primaryText='Popular' onClick={() => this.goTo('/r/popular')} />
              <ListItem primaryText='Subscriptions' disabled={true} />
              <Divider />
              <ListItem primaryText='Log out' disabled={true} />
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withRouter(Nav)