import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import ListingsFeed from '../components/ListingsFeed'
import Loading from '../components/Loading'
import Nav from './Nav'
import PageContainer from '../components/PageContainer'
import { loadListings } from '../actions'
import { paramsEndpoint } from '../utils'

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
    this.boundActionCreators.loadListings(paramsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search)
    )))
  }

  componentWillReceiveProps(nextProps) {
    // If params change, then reload the new page's params
    if (this.props.match.params !== nextProps.match.params) {
      this.boundActionCreators.loadListings(paramsEndpoint(Object.assign({},
        nextProps.match.params,
        parse(this.props.location.search)
      )))
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <PageContainer>
          {Object.keys(this.props.pageData).length > 0
            ? <ListingsFeed
                pages={this.props.pages}
                pageData={this.props.pageData}
              />
            : <Loading />
          }
        </PageContainer>
      </div>
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
  let endpoint = paramsEndpoint(Object.assign({},
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
      endpoint = paramsEndpoint(nextPageParams)
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