import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { loadListings } from '../actions'
import { mySubredditsEndpoint } from '../utils'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleClose = this.handleClose.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.boundActionCreators = bindActionCreators({ loadListings }, props.dispatch)
  }

  componentWillMount() {
    this.boundActionCreators.loadListings('/subreddits/mine/subscriber')
  }

  handleClose() {
    this.setState({ open: false })
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

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { listingsByEndpoint },
    entities: { listings }
  } = state
  // Populates the pages array
  const pages = []
  let endpoint = mySubredditsEndpoint({ where: 'subscriber' })
  while (endpoint && listingsByEndpoint[endpoint]) {
    const page = listingsByEndpoint[endpoint]
    pages.push(page)
    if (page.after) {
      endpoint = mySubredditsEndpoint({
        where: 'subscriber',
        after: page.after
      })
    } else {
      endpoint = null
    }
  }
  // Aggregates the listings in the pageData array by page.
  let isFetching = false
  let pageData = []
  for (let page in pages) {
    if (Object.keys(listings).length > 0 && pages[page]) {
      // Page is done loading
      if (!pages[page].isFetching) {
        const pageListings = pages[page].ids.map(id => listings[id])
        for (let listing in pageListings) {
          pageData.push(pageListings[listing])
        }
      } else {
        // Page is loading
        isFetching = true
      }
    }
  }

  return {
    isFetching,
    pages,
    pageData
  }
}

export default withRouter(connect(mapStateToProps)(Nav))