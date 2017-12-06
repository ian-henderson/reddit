import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import ListingsLayout from '../components/ListingsLayout'
import { loadListings } from '../actions'
import { listingsEndpoint } from '../utils'

class Listings extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators({ loadListings }, props.dispatch)
  }

  componentWillMount() {
    // Redirects to Login if unauthenticated
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/login')
    }
    // Loads listings based on the url and parameters
    this.boundActionCreators.loadListings(listingsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search)
    )))
  }


  componentDidMount() {
    document.addEventListener('scroll', event => {
      /*
       * Fetches Posts on scroll
       *
       * Requirements
       * 1. The content of the page is larger than the view.
       * 2. The position on screen at least halfway down the page.
       *
       * Future Plans
       * The issue I want to correct is the initial listing load when
       * revisiting views that already have pages loaded.
       *
       * Solution Abstract
       * There should be an abstraction that only loads the first page and
       * then loads more pages as the user scrolls down the page. Once the
       * abstraction runs out of downloaded pages, it'll fetch more from
       * the api.
       *
       * Additionally, I'd also like to implement a HOF to handle the api
       * calls.
       */
      const { body } = event.srcElement || event.originalTarget
      const elementLargerThanView = body.offsetHeight > window.innerHeight
      const closeToBottom = window.scrollY > (body.offsetHeight / 2)

      if (elementLargerThanView && closeToBottom) {
        const { pages } = this.props
        const lastPage = pages[pages.length - 1]
        this.boundActionCreators.loadListings(listingsEndpoint(Object.assign({},
          this.props.match.params,
          parse(this.props.location.search),
          { after: lastPage.after }
        )))
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // If params change, then reload the new page's params
    if (this.props.match.params !== nextProps.match.params) {
      this.boundActionCreators.loadListings(listingsEndpoint(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      )))
    }
  }

  render() {
    return (
      <ListingsLayout
        isFetching={this.props.isFetching}
        pages={this.props.pages}
        pageData={this.props.pageData}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { listingsByEndpoint },
    entities: { listings }
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

  return {
    isAuthenticated: state.auth.isAuthenticated,
    isFetching,
    pages,
    pageData
  }
}

export default withRouter(connect(mapStateToProps)(Listings))