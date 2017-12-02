import React from 'react'
import moment from 'moment'
import { Card, CardHeader } from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  card: {
    boxShadow: '0',
  },
  cardHeader: {
    padding: '8px 16px'
  },
  cardHeaderText: {
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  cardHeaderTitle: {
    marginBottom: '8px'
  },
  navButton: {
    display: 'inline-block',
    marginLeft: '15px'
  },
  vote: {
    display: 'inline-block'
  },
  voteButton: {
    display: 'block',
    left: '-7px'
  }
}

const title = data => data.title

const scoreFilter = score => {
  return Number(score) >= 10000
    ? `${(Number(score) / 1000).toFixed(1)}k`
    : String(score)
}

const Vote = props =>
  <div style={styles.vote}>
    <FontIcon className='material-icons' style={styles.voteButton}>&#xE316;</FontIcon>
    <FontIcon className='material-icons' style={styles.voteButton}>&#xE313;</FontIcon>
  </div>

const subtitle = data =>
  `${scoreFilter(data.score)} points ` +
  `submitted ${moment.unix(data.createdUtc).fromNow()} ` +
  `by ${data.author} ` +
  `to ${data.subredditNamePrefixed}`

const ListingsFeed = props =>
  <div>
    {props.pageData.map((listing, index) =>
      <Card key={index} style={styles.card}>
        <CardHeader
          title={title(listing.data)}
          subtitle={subtitle(listing.data)}
          style={styles.cardHeader}
          textStyle={styles.cardHeaderText}
          titleStyle={styles.cardHeaderTitle}
          avatar={<Vote />}
        />
      </Card>
    )}
    <div>
      <p style={styles.navButton}>View more:</p>
      <RaisedButton label='Next' primary={true} style={styles.navButton} />
    </div>
  </div>

export default ListingsFeed