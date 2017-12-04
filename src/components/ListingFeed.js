import React from 'react'
import Divider from 'material-ui/Divider'
import Listing from './Listing'
import Loading from './Loading'

const ListingFeed = props =>
  <div>
    <Divider />
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <Listing data={listing.data} />
        <Divider />
      </div>
    )}
    {props.isFetching && <Loading />}
  </div>

export default ListingFeed