import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ListingLayout from '../components/ListingLayout'
import { loadListingsByName } from '../actions'

class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators(
      { loadListingsByName }, 
      props.dispatch
    )
  }

  componentDidMount() {
    // Redirects to Login if unauthenticated.
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/login')
    }
    // Loads the listing.
    this.boundActionCreators.loadListingsByName('t3_', [
      this.props.match.params.id
    ])
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            {this.props.listing 
              ? this.props.listing.data.title
              : 'r/' + this.props.match.params.subreddit}
          </title>
        </Helmet>
        <ListingLayout />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { 
    entities: { listings }, 
    auth: { isAuthenticated }
  } = state
  const { id } = ownProps.match.params

  return { isAuthenticated, listing: listings[id] }
}

export default withRouter(connect(mapStateToProps)(Listing))