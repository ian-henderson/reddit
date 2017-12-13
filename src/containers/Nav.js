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
  }
}

class Nav extends React.Component {
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
    const { subreddit } = this.props.match.params
    const title = subreddit ? `r/${subreddit}` : 'Home'
    return (
      <div>
        <AppBar
          style={styles.appBar}
          title='reddit'
          onLeftIconButtonTouchTap={this.handleToggle}
          onTitleTouchTap={() => window.scrollTo(0, 0)}
        />
        <Drawer
          docked={false}
          width={256}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}>
          <div>
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