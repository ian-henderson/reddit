import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import ListingsFeed from '../components/ListingsFeed'
import ListingsFeedToolbar from '../components/ListingsFeedToolbar'
import PageOuterContainer from '../components/PageOuterContainer'
import Nav from '../containers/Nav'
import { listingsEndpoint } from '../utils'

class ListingsLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { sorting: null }
    this.handleSorting = this.handleSorting.bind(this)
  }

  componentDidMount() {
    this.setState({ sorting: this.props.match.params.sorting || 'hot' })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.sorting !== this.props.match.params.sorting) {
      this.setState({ sorting: this.props.match.params.sorting || 'hot' })
    }
  }

  handleSorting(event, key, value) {
    const endpoint = listingsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search),
      { sorting: value }
    ))
    this.props.history.push(endpoint)
  }

  render() {
    const { subreddit } = this.props.match.params
    let headTitle = null
    let navTitle = null
    
    // Home Case
    if (!subreddit) {
      headTitle = 'reddit: the front page of the internet'
      navTitle = 'Home'
    }

    // Popular Case
    if (subreddit === 'popular') {
      headTitle = 'popular links'
      navTitle = 'Popular'
    }

    // Subreddit Case
    if (this.props.subredditInfo) {
      headTitle = this.props.subredditInfo.title
      navTitle = this.props.subredditInfo.displayNamePrefixed
    }

    return (
      <div>
        <Helmet><title>{headTitle}</title></Helmet>
        <Nav title={navTitle} />
        <PageOuterContainer>
          <div style={{margin: 'auto', maxWidth: '588px'}}>
            <ListingsFeedToolbar 
              sortingValue={this.state.sorting} 
              handleSorting={this.handleSorting} 
            />
            <ListingsFeed
              isFetching={this.props.isFetching}
              isSubreddit={Boolean(subreddit)}
              pageData={this.props.pageData}
            />
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

ListingsLayout.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  pageData: PropTypes.array.isRequired,
  subredditInfo: PropTypes.object
}

export default withRouter(ListingsLayout)