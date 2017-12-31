import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
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
    this.boundActionCreators.loadListingsByName('t3_', [this.props.match.params.id])
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
        <ListingLayout data={this.props.listing} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entities: { listings }, auth: { isAuthenticated } } = state
  const listing = listings[ownProps.match.params.id]

  return { isAuthenticated, listing }
}

export default withRouter(connect(mapStateToProps)(Listing))