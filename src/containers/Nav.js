import React from 'react'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import AppBar from 'material-ui/AppBar'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import { paramsEndpoint } from '../utils'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false, sorting: null }
    this.goTo = this.goTo.bind(this)
    this.handleSorting = this.handleSorting.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentWillMount() {
    this.setState({ sorting: this.props.match.params.sorting || 'hot' })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.sorting !== this.props.match.params.sorting) {
      this.setState({ sorting: this.props.match.params.sorting || 'hot' })
    }
  }

  goTo(target) {
    this.setState({ open: false })
    this.props.history.push(target)
  }

  handleSorting(event, value) {
    const endpoint = paramsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search),
      { sorting: value }
    ))
    this.goTo(endpoint)
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
          title={title}
          style={{'position': 'fixed', 'top': '0'}}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><ContentFilter /></IconButton>}
              onChange={this.handleSorting}
              value={this.state.sorting}
              anchorOrigin={{'vertical': 'bottom', 'horizontal': 'right'}}
              targetOrigin={{'vertical': 'top', 'horizontal': 'right'}}
            >
              <MenuItem value='hot' primaryText='Hot' />
              <MenuItem value='new' primaryText='New' />
              <MenuItem value='rising' primaryText='Rising' />
              <MenuItem value='controversial' primaryText='Controversial' />
              <MenuItem value='top' primaryText='Top' />
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <AppBar
            title='reddit'
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <List>
            <ListItem primaryText='Home' onClick={() => this.goTo('/')} />
            <ListItem primaryText='Popular' onClick={() => this.goTo('/r/popular')} />
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withRouter(Nav)