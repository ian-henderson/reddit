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
    const { author, id, numComments, subredditNamePrefixed, score, title } = this.props.listingData
    return (
      <div>
        <Helmet><title>{title}</title></Helmet>
        <Nav title={subredditNamePrefixed} />
        <PageOuterContainer>
          <div style={{margin: 'auto', maxWidth: '588px'}}>
            <Card style={{borderRadius: '0', boxShadow: '0', marginTop: '60px'}}>
              <Divider />
              <CardTitle title={title} subtitle={`u/${author}`} />
              <Divider />
              <ListingButtons 
                id={id}
                numComments={numComments} 
                score={score} 
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
  listingData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    subredditNamePrefixed: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
}

export default ListingLayout