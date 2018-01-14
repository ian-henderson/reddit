import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { grey300  } from 'material-ui/styles/colors'
import { logOut } from '../actions'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.boundActionCreators = bindActionCreators({ logOut }, props.dispatch)
    this.goTo = this.goTo.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  goTo(target) {
    this.setState({ open: false })
    this.props.history.push(target)
  }

  handleToggle() {
    this.setState({ open: !this.state.open })
  }

  logOut() {
    this.handleToggle()
    this.boundActionCreators.logOut()
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) this.props.history.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthenticated) this.props.history.push('/login')
  }

  render() {
    return (
      <div>
        <AppBar
          style={{position: 'fixed', top: '0'}}
          title={
            <div>
              Reddit
              <span style={{borderLeft: `1px solid ${grey300}`, margin: 'auto 25px'}} />
              {this.props.title}
            </div>
          }
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={256}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}>
          <div>
            <AppBar
              style={{borderBottom: `1px solid ${grey300}`, boxShadow: 'none'}}
              showMenuIconButton={false}
              title='Reddit'
              onLeftIconButtonClick={this.handleToggle}
            />
            <List>
              <ListItem primaryText='Home' onClick={() => this.goTo('/')} />
              <ListItem primaryText='Popular' onClick={() => this.goTo('/r/popular')} />
              <ListItem primaryText='Log out' onClick={this.logOut} />
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default withRouter(connect(mapStateToProps)(Nav))