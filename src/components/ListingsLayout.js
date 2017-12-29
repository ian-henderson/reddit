import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import ListingsFeed from '../components/ListingsFeed'
import ListingsFeedToolbar from '../components/ListingsFeedToolbar'
import PageOuterContainer from '../components/PageOuterContainer'
import Nav from '../containers/Nav'
import { listingsEndpoint } from '../utils'

const styles = {
  feed: {
    margin: 'auto',
    maxWidth: '588px'
  }
}

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
    /* Navbar Title & Header Tag */

    // Home Case
    let headTitle = 'reddit: the front page of the internet'
    let navTitle = 'Home'

    // Popular Case
    if (this.props.match.params.subreddit === 'popular') {
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
          <div style={styles.feed}>
            <ListingsFeedToolbar 
              sortingValue={this.state.sorting} 
              handleSorting={this.handleSorting} 
            />
            <ListingsFeed
              isFetching={this.props.isFetching}
              pageData={this.props.pageData}
            />
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

export default withRouter(ListingsLayout)