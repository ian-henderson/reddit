import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import Card, { CardText, CardTitle } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Nav from '../containers/Nav'
import ListingButtons from './ListingButtons'
import PageOuterContainer from './PageOuterContainer'

class ListingLayout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.subtitle = this.subtitle.bind(this)
  }

  subtitle() {
    const { author, createdUtc } = this.props.listingData
    const subtitle = `submitted ${moment.unix(createdUtc).fromNow()} `
      + `by u/${author}`
    return subtitle
  }

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
                titleStyle={{fontSize: '14pt', lineHeight: '24px', paddingBottom: '8px'}}
                subtitle={this.subtitle()} 
              />
              <CardText>
                <pre style={{margin: '0 auto', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {JSON.stringify(listingData, null, 2)}
                </pre>
              </CardText>
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