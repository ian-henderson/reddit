import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import HomeMobileLayout from '../components/HomeMobileLayout'
import SubredditMobileLayout from '../components/SubredditMobileLayout'
import { loadListingsByEndpoint, loadSubredditInfo } from '../actions'
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
    this.boundActionCreators.loadListingsByEndpoint(listingsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search)
    )))
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
        this.boundActionCreators.loadListingsByEndpoint(listingsEndpoint(Object.assign({},
          this.props.match.params,
          parse(this.props.location.search),
          { after: lastPage.after }
        )))
      }
    })
    // Event listener which maps the page width to the component's state.
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillReceiveProps(nextProps) {
    // If params change, then reload the new page's params and reset page count.
    if (this.props.match.params !== nextProps.match.params) {
      this.boundActionCreators.loadListingsByEndpoint(listingsEndpoint(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      )))
      // Loads subreddit data.
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
    /*
     * Breakpoint Widths
     * 1. Mobile: smaller than or equal to 768px.
     * 2. Small devices: Larger than 768px.
     * 3. Medium devices: Larger than 992px.
     * 4. Large devices: Larger than 1200px.
     * 
     * TODO: Create Home & Subreddit layouts for each width.
     */

    // Home Layout
    const { subreddit } = this.props.match.params
    if (!subreddit || subreddit === 'popular') {
      return (
        <HomeMobileLayout
          isFetching={this.props.isFetching}
          pageData={this.props.pageData}
          pages={this.props.pages}
        />
      )
    }   

    // Subreddit Layout
    return (
      <SubredditMobileLayout
        isFetching={this.props.isFetching}
        pageData={this.props.pageData}
        pages={this.props.pages}
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
      const nextPageParams = Object.assign({},
        ownProps.match.params,
        { after: page.after }
      )
      endpoint = listingsEndpoint(nextPageParams)
    } else {
      endpoint = null
    }
  }
  // Aggregates the listings in the pageData array by page.
  let isFetching = false
  let pageData = []
  if (Object.keys(listings).length > 0) {
    for (let page in pages) {
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

  // Finds the subreddit data if applicable.
  // This syntax is a little tricky, so
  // TODO: Create a util function to simplify this.
  const { subreddit } = ownProps.match.params
  const subredditInfo = subreddit && subredditsInfo[subreddit.toLowerCase()]

  return {
    isAuthenticated,
    isFetching,
    pageData,
    pages,
    subredditInfo
  }
}

export default withRouter(connect(mapStateToProps)(Listings))