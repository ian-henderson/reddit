import React from 'react'
import Nav from '../containers/Nav'
import PageOuterContainer from '../components/PageOuterContainer'

class ListingLayout extends React.PureComponent {
  render() {
    return (
      <div>
        <Nav />
        <PageOuterContainer>
          <h1>Listing</h1>
        </PageOuterContainer>
      </div>
    )
  }
}

export default ListingLayout