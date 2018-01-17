import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card, { CardHeader, CardText } from 'material-ui/Card'
import { grey300 } from 'material-ui/styles/colors'
import ListingButtons from './ListingButtons'

// TODO: Find a way around using isSubreddit
const Subtitle = props =>
  <div>
    {props.isSubreddit
      ? `u/${props.data.author}`
      : <Link 
          to={`/${props.data.subredditNamePrefixed}`} 
          style={{color: 'inherit', textDecoration: 'none'}}
        >
          {props.data.subredditNamePrefixed}
        </Link>
    }
    {` • ${moment.unix(props.data.createdUtc).fromNow()}`}
    {!props.data.media && props.data.domain ? ` • ${props.data.domain}` : null}
  </div>

Subtitle.propTypes = {
  data: PropTypes.object.isRequired,
  isSubreddit: PropTypes.bool.isRequired
}

const styles = {
  feedItem: {
    borderLeft: `1px solid ${grey300}`, 
    borderRight: `1px solid ${grey300}`, 
    borderTop: `1px solid ${grey300}`, 
    borderRadius: '0', 
    boxShadow: '0'
  }
}

const ListingsFeedItem = props =>
  <Card style={styles.feedItem}>
    {/* Header */}
    <CardHeader
      style={{padding: '10px 16px 2px'}}
      subtitle={<Subtitle data={props.data} isSubreddit={props.isSubreddit} />}
      textStyle={{padding: '0px'}}
    />
    {/* Listing Title */}
    <a 
      href={`https://reddit.com${props.data.permalink}`} 
      target="_blank" 
      style={{textDecoration: "none"}}
    >
      <CardText style={{padding: '4px 16px'}}>{props.data.title}</CardText>
    </a>
    <ListingButtons 
      likes={props.data.likes}
      name={props.data.name}
      numComments={props.data.numComments} 
      permalink={props.data.permalink}
      score={props.data.score} 
    />
  </Card>

ListingsFeedItem.propTypes = {
  data: PropTypes.object.isRequired,
  isSubreddit: PropTypes.bool.isRequired
}

export default ListingsFeedItem
