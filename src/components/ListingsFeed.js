import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import ListingsFeedItem from './ListingsFeedItem'
import Loading from './Loading'

const ListingsFeed = props =>
  <div>
    <Divider />
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <ListingsFeedItem data={listing.data} isSubreddit={props.isSubreddit} />
        <Divider />
      </div>
    )}
    {props.isFetching && <Loading />}
  </div>

ListingsFeed.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isSubreddit: PropTypes.bool.isRequired,
  pageData: PropTypes.array.isRequired
}

export default ListingsFeed