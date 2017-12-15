import React from 'react'
import Divider from 'material-ui/Divider'
import HomeListing from './HomeListing'
import Loading from './Loading'

const HomeListingFeed = props =>
  <div>
    <Divider />
    {props.pageData.map((listing, index) =>
      <div key={index}>
        <HomeListing data={listing.data} />
        <Divider />
      </div>
    )}
    {props.isFetching && <Loading />}
  </div>

export default HomeListingFeed