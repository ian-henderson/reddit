import React from 'react'
import { connect } from 'react-redux'
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
  appBarDrawer: {
    fontFamily: "'Roboto Mono', monospace",
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
    const { subredditInfo } = this.props
    let title = subredditInfo ? subredditInfo.displayNamePrefixed : 'reddit'
    const { subreddit } = this.props.match.params
    if (subreddit && subreddit.toLowerCase() === 'popular') {
      title = 'r/popular'
    }
    return (
      <div>
        <AppBar
          style={styles.appBar}
          title={title}
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
              title={title}
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

const mapStateToProps = (state, ownProps) => {
  const { subredditsInfo } = state.entities
  const { subreddit } = ownProps.match.params
  const subredditInfo = subreddit ? subredditsInfo[subreddit.toLowerCase()] : null
  return { subredditInfo }
}

export default withRouter(connect(mapStateToProps)(Nav))