import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import ListingLayout from '../components/ListingLayout'
import { loadListingsByName } from '../actions'

class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators({ loadListingsByName }, props.dispatch)
  }

  componentDidMount() {
    // Redirects to Login if unauthenticated.
    if (!this.props.isAuthenticated) {
      return this.props.history.push('/login')
    }
    // Loads the listing.
    this.boundActionCreators.loadListingsByName(['t3_' + this.props.match.params.id])
  }

  render() {
    return (
      <ListingLayout />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { listings } = state.entities
  return {
    isAuthenticated: state.auth.isAuthenticated,
    listing: listings[ownProps.match.params.id]
  }
}

export default withRouter(connect(mapStateToProps)(Listing))