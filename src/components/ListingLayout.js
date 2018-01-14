import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Card, { CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Nav from '../containers/Nav'
import ListingButtons from './ListingButtons'
import PageOuterContainer from './PageOuterContainer'

class ListingLayout extends React.PureComponent {
  render() {
    const { listingData } = this.props
    return (
      <div>
        <Helmet><title>{listingData.title}</title></Helmet>
        <Nav title={listingData.subredditNamePrefixed} />
        <PageOuterContainer>
          <div style={{margin: 'auto', maxWidth: '588px'}}>
            <Card style={{borderRadius: '0', boxShadow: '0', marginTop: '60px'}}>
              <Divider />
              <CardTitle 
                title={listingData.title} 
                subtitle={`u/${listingData.author}`} 
              />
              <Divider />
              <ListingButtons 
                likes={listingData.likes}
                name={listingData.name}
                numComments={listingData.numComments} 
                score={listingData.score} 
              />
              <Divider />
            </Card>
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

ListingLayout.propTypes = {
  listingData: PropTypes.object.isRequired
}

export default ListingLayout