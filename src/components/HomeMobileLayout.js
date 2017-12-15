import React from 'react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { parse } from 'query-string'
import HomeListingFeed from '../components/SubredditListingFeed'
import ListingFeedToolbar from '../components/ListingFeedToolbar'
import Nav from '../containers/Nav'
import PageOuterContainer from '../components/PageOuterContainer'
import { listingsEndpoint } from '../utils'

const styles = {
  feed: {
    margin: 'auto',
    maxWidth: '588px'
  }
}

class HomeMobileLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { sorting: null }
    this.handleSorting = this.handleSorting.bind(this)
  }

  componentWillMount() {
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
    let headTitle = 'reddit: the front page of the internet'
    let navTitle = 'Home'
    const { subreddit } = this.props.match.params
    if (subreddit && subreddit === 'popular') {
      headTitle = 'popular links'
      navTitle = 'Popular'
    }

    return (
      <div>
        <Helmet><title>{headTitle}</title></Helmet>
        <Nav title={navTitle} />
        <PageOuterContainer>
          <div style={styles.feed}>
            <ListingFeedToolbar 
              sortingValue={this.state.sorting} 
              handleSorting={this.handleSorting} 
            />
            <HomeListingFeed
              isFetching={this.props.isFetching}
              pages={this.props.pages}
              pageData={this.props.pageData}
            />
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

export default withRouter(HomeMobileLayout)