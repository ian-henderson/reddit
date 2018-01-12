import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import ListingLayout from '../components/ListingLayout'
import Loading from '../components/Loading'
import { loadListingsByName } from '../actions'

class Listing extends React.Component {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators({ loadListingsByName }, props.dispatch)
  }

  componentDidMount() {
    // Loads listing based on page parameters.
    this.boundActionCreators.loadListingsByName('t3_', [this.props.match.params.id])
  }

  render() {
    if (!this.props.listingData) return <Loading />

    return <ListingLayout listingData={this.props.listingData} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entities: { listings } } = state
  const { id } = ownProps.match.params
  const listingData = listings[id] && listings[id].data

  return { listingData }
}

export default withRouter(connect(mapStateToProps)(Listing))