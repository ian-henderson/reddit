import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ListingsFeed from '../components/ListingsFeed'
import Loading from '../components/Loading'
import Nav from '../containers/Nav'
import PageOuterContainer from '../components/PageOuterContainer'

const styles = {
  feed: {
    margin: 'auto',
    width: '588px'
  },
  pageButton: {
    display: 'inline-block',
    marginLeft: '10px'
  },
  pageButtons: {
    margin: '10px auto'
  }
}

const ListingsLayout = props =>
  <div>
    <Nav />
    <PageOuterContainer>
      {Object.keys(props.pageData).length > 0
        ? (
          <div style={styles.feed}>
            <ListingsFeed
              pages={props.pages}
              pageData={props.pageData}
            />
            <div style={styles.pageButtons}>
              <p style={styles.pageButton}>View more:</p>
              <RaisedButton label='previous' primary={true} style={styles.pageButton} />
              <RaisedButton label='next' primary={true} style={styles.pageButton} />
            </div>
          </div>
        ) : ( <Loading /> )
      }
    </PageOuterContainer>
  </div>

export default ListingsLayout