import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import { loadListings } from '../actions'
import { paramsToEndpoint } from '../utils'

class Listings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedTab: null }
    this.boundActionCreators = bindActionCreators({ loadListings }, props.dispatch)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  componentWillMount() {
    // Redirects to Login if unauthenticated
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/login')
    }
    // Loads listings based on the url and parameters
    this.boundActionCreators.loadListings(Object.assign({},
      this.props.match.params,          // url
      parse(this.props.location.search) // parameters
    ))
    // Sets the focused tab to the sorting slug in url
    if (this.props.match.params.sorting) {
      this.setState({ selectedTab: this.props.params.sorting })
    } else {
      this.setState({ selectedTab: 'hot' })
    }
  }

  componentDidMount() {
    /*
    document.addEventListener('scroll', event => {
      /*
       * Fetches Posts on scroll
       *
       * Requirements
       * 1. The content of the page is larger than the view
       * 2. The position on screen is less than a page length from the bottom

      const { body } = event.srcElement
      const elementLargerThanView = body.offsetHeight > window.innerHeight
      const closeToBottom = window.scrollY > (body.offsetHeight - window.innerHeight)

      if (elementLargerThanView && closeToBottom) {
        const { pages } = this.props
        const lastPage = pages[pages.length - 1]
        this.props.loadListings(Object.assign({},
          this.props.params,
          this.props.loadListings.query,
          { after: lastPage.after }
        ))
      }
    })
    */
  }

  componentWillReceiveProps(nextProps) {
    // If sorting changes, then load the correct listings
    const { sorting } = this.props.match.params
    if (sorting !== nextProps.match.params.sorting) {
      this.setState({ selectedTab: nextProps.match.params.sorting })
      this.props.loadListings(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      ))
    }
  }

  handleTabChange(sorting) {
    const newParams = Object.assign({}, this.props.params, { sorting })
    const endpoint = paramsToEndpoint(newParams)
    this.props.history.push(endpoint)
  }

  render() {
    return <h1>Listings</h1>
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { listingsByEndpoint },
    entities: { listings }
  } = state
  // Populates pages array.
  const pages = []
  let endpoint = paramsToEndpoint(Object.assign({},
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
      endpoint = paramsToEndpoint(nextPageParams)
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