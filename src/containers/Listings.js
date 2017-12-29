import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { parse } from 'query-string'
import { loadListingsByEndpoint, loadSubredditInfo } from '../actions'
import ListingsLayout from '../components/ListingsLayout'
import { listingsEndpoint } from '../utils'

class Listings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { height: 0, width: 0 }
    this.boundActionCreators = bindActionCreators(
      { loadListingsByEndpoint, loadSubredditInfo }, 
      props.dispatch
    )
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    // Redirects to Login if unauthenticated.
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/login')
    }
    // Loads initial listings based on the url and parameters.
    const endpoint = listingsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search)
    ))
    this.boundActionCreators.loadListingsByEndpoint(endpoint)
    // Loads subreddit data.
    const { subreddit } = this.props.match.params
    if (subreddit && subreddit !== 'popular') {
      this.boundActionCreators.loadSubredditInfo(subreddit)
    }
    // Event listener which loads next page when two page lengths away from bottom.
    document.addEventListener('scroll', event => {
      const { body } = event.srcElement || event.originalTarget
      const bodyLargerThanView = body.offsetHeight > window.innerHeight
      const closeToBottom = window.scrollY > (body.offsetHeight - (2 * window.innerHeight))
      if (bodyLargerThanView && closeToBottom) {
        const { pages } = this.props
        const lastPage = pages[pages.length - 1]
        const endpoint = listingsEndpoint(Object.assign({},
          this.props.match.params,
          parse(this.props.location.search),
          { after: lastPage.after }
        ))
        this.boundActionCreators.loadListingsByEndpoint(endpoint)
      }
    })
    // Event listener which maps the page width to the component's state.
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillReceiveProps(nextProps) {
    // If params change, then reload the new page's params and reset page count.
    if (this.props.match.params !== nextProps.match.params) {
      const endpoint = listingsEndpoint(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      ))
      this.boundActionCreators.loadListingsByEndpoint(endpoint)
      // Loads subreddit data (r/popular/about doesn't return subreddit info).
      const { subreddit } = nextProps.match.params
      if (subreddit && subreddit !== 'popular') {
        this.boundActionCreators.loadSubredditInfo(subreddit)
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    return (
      <ListingsLayout
        isFetching={this.props.isFetching}
        pageData={this.props.pageData}
        subredditInfo={this.props.subredditInfo}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { isAuthenticated },
    pagination: { listingsByEndpoint },
    entities: { listings, subredditsInfo }
  } = state

  // Populates pages array.
  const pages = []
  let endpoint = listingsEndpoint(Object.assign({},
    ownProps.match.params,
    parse(ownProps.location.search)
  ))
  while (endpoint && listingsByEndpoint[endpoint]) {
    const page = listingsByEndpoint[endpoint]
    pages.push(page)
    if (page.after) {
      endpoint = listingsEndpoint(Object.assign({},
        ownProps.match.params,
        { after: page.after }
      ))
    } else {
      endpoint = null
    }
  }

  // Aggregates the listings in the pageData array by page.
  let isFetching = false
  const pageData = []
  pages.forEach(page => {
    isFetching = page.isFetching
    // When page is done loading, include the page's listing in pageData array.
    if (!isFetching) {
      page.ids
        .map(id => listings[id])
        .forEach(listing => pageData.push(listing))
    }
  })

  // Finds the subreddit data if applicable.
  const { subreddit } = ownProps.match.params
  const subredditInfo = subreddit && subredditsInfo[subreddit.toLowerCase()]

  return { isAuthenticated, isFetching, pageData, pages, subredditInfo }
}

export default withRouter(connect(mapStateToProps)(Listings))