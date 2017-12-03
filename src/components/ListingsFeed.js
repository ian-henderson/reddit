import React from 'react'
import Divider from 'material-ui/Divider'
import Listing from './Listing'

const ListingsFeed = props =>
  <div>
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <Listing data={listing.data} />
        {index < Object.keys(props.pageData).length - 1 ? <Divider /> : null}
      </div>
    )}
  </div>

export default ListingsFeed