import React from 'react'
import Divider from 'material-ui/Divider'
import ListingsFeedItem from './ListingsFeedItem'
import Loading from './Loading'

const ListingsFeed = props =>
  <div>
    <Divider />
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <ListingsFeedItem data={listing.data} />
        <Divider />
      </div>
    )}
    {props.isFetching && <Loading />}
  </div>

export default ListingsFeed