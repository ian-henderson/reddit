import React from 'react'
import Divider from 'material-ui/Divider'
import SubredditListing from './SubredditListing'
import Loading from './Loading'

const SubredditListingFeed = props =>
  <div>
    <Divider />
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <SubredditListing data={listing.data} />
        <Divider />
      </div>
    )}
    {props.isFetching && <Loading />}
  </div>

export default SubredditListingFeed