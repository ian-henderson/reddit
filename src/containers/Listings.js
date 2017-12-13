import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import { Helmet } from 'react-helmet'
import ListingsLayout from '../components/ListingsLayout'
import { loadListingsByEndpoint, loadSubredditAbout } from '../actions'
import { listingsEndpoint } from '../utils'

class Listings extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(
      { loadListingsByEndpoint, loadSubredditAbout }, 
      props.dispatch
    )
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
    if (this.props.match.params.subreddit) {
      this.boundActionCreators.loadSubredditAbout(this.props.match.params.subreddit)
    }
    // Loads next page when two page lengths away from bottom.
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
  }

  componentWillReceiveProps(nextProps) {
    // If params change, then reload the new page's params and reset page count.
    if (this.props.match.params !== nextProps.match.params) {
      this.boundActionCreators.loadListingsByEndpoint(listingsEndpoint(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      )))
      // Loads subreddit data.
      if (nextProps.match.params.subreddit) {
        this.boundActionCreators.loadSubredditAbout(nextProps.match.params.subreddit)
      }
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            {this.props.subreddit 
              ? this.props.subreddit.title
              : 'reddit: the front page of the internet'}
          </title>
        </Helmet>
        <ListingsLayout
          isFetching={this.props.isFetching}
          pages={this.props.pages}
          pageData={this.props.pageData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { listingsByEndpoint },
    entities: { listings, subreddits }
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

  // Finds the subreddit data if applicable.
  let subreddit = null
  const subredditParam = ownProps.match.params.subreddit
  if (subredditParam && subreddits[subredditParam.toLowerCase()]) {
    subreddit = subreddits[subredditParam.toLowerCase()]
  }

  return {
    isAuthenticated: state.auth.isAuthenticated,
    isFetching,
    pages,
    pageData,
    subreddit
  }
}

export default withRouter(connect(mapStateToProps)(Listings))