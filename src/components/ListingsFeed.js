import React from 'react'
import PropTypes from 'prop-types'
import { grey300 } from 'material-ui/styles/colors'
import ListingsFeedItem from './ListingsFeedItem'
import Loading from './Loading'

const styles = {
  loading: {
    border: `1px solid ${grey300}`, 
    borderRadius: '0', 
    boxShadow: '0'
  }
}

const ListingsFeed = props =>
  <div>
    {props.pageData.map((listing, index) =>
      <ListingsFeedItem 
        data={listing.data} 
        key={index}
        isSubreddit={props.isSubreddit} 
      />
    )}
    {props.isFetching && (
      <div style={styles.loading}>
        <Loading />
      </div>
    )}
  </div>

ListingsFeed.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isSubreddit: PropTypes.bool.isRequired,
  pageData: PropTypes.array.isRequired
}

export default ListingsFeed