import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card, { CardHeader, CardText } from 'material-ui/Card'
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

const ListingsFeedItem = props =>
  <Card style={{borderRadius: '0', boxShadow: '0'}}>
    {/* Header */}
    <CardHeader
      style={{padding: '10px 16px 2px'}}
      subtitle={<Subtitle data={props.data} isSubreddit={props.isSubreddit} />}
      textStyle={{padding: '0px'}}
    />
    {/* Listing Title */}
    <Link 
      to={props.data.permalink} 
      style={{color: 'inherit', textDecoration: 'none'}}
    >
      <CardText style={{padding: '4px 16px'}}>{props.data.title}</CardText>
    </Link>
    <ListingButtons 
      likes={props.data.likes}
      name={props.data.name}
      numComments={props.data.numComments} 
      score={props.data.score} 
    />
  </Card>

ListingsFeedItem.propTypes = {
  data: PropTypes.object.isRequired,
  isSubreddit: PropTypes.bool.isRequired
}

export default ListingsFeedItem
