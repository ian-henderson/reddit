import React from 'react'
import Divider from 'material-ui/Divider'
import Listing from './Listing'

const ListingFeed = props =>
  <div>
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <Listing data={listing.data} />
        <Divider />
      </div>
    )}
  </div>

export default ListingFeed