import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Card, { CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { grey300, grey600, white } from 'material-ui/styles/colors'

const styles = {
  buttonSection: {
    display: 'inline-block'
  },
  card: {
    borderRadius: '0',
    boxShadow: '0'
  },
  cardActions: {
    padding: '2px 8px'
  },
  cardHeader: {
    padding: '10px 16px 2px'
  },
  cardHeaderIcon: {
    color: grey600
  },
  cardHeaderText: {
    padding: '0px'
  },
  cardText: {
    fontWeight: 'bold',
    padding: '0px 16px',
    overflowWrap: 'break-word'
  },
  cardTextCaption: {
    overflow: 'hidden',
    padding: '8px',
    textOverflow: 'ellipsis'
  },
  cardTextFlex: {
    flex: 'auto',
    padding: '2px 16px 0px'
  },
  commentsButton: {
    color: grey600
  },
  commentsButtonLabel: {
    fontSize: '10pt',
    textTransform: 'none'
  },
  commentsButtonText: {
    fontSize: '10pt'
  },
  flexContainer: {
    display: 'flex'
  },
  listingContentLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  subtitleLink: {
    color: 'inherit',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  voteButton: {
    color: grey600,
    fontSize: '10pt',
    minWidth: '30px'
  },
  voteButtonIcon: {
    fontSize: '10pt'
  },
  voteButtonText: {
    fontSize: '10pt',
    padding: '0px 0px 0px 8px',
    textTransform: 'none'
  }
}

const fontIcon = name =>
  <FontIcon className='material-icons' style={styles.voteButtonIcon}>
    {name}
  </FontIcon>

const numberFilter = value => {
  const number = Number(value)
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : `${number}`
}

const Subtitle = props =>
  <div>
    {props.isSubreddit
      ? `u/${props.data.author}`
      : <Link to={`/${props.data.subredditNamePrefixed}`} style={styles.subtitleLink}>
          {props.data.subredditNamePrefixed}
        </Link>}
    {` • ${moment.unix(props.data.createdUtc).fromNow()}`}
    {!props.data.media && props.data.domain ? ` • ${props.data.domain}` : null}
  </div>

const ListingsFeedItem = props =>
  <Card style={styles.card}>
    {/* Header */}
    <CardHeader
      iconStyle={styles.cardHeaderIcon}
      style={styles.cardHeader}
      subtitle={<Subtitle data={props.data} isSubreddit={props.isSubreddit} />}
      textStyle={styles.cardHeaderText} />
    {/* Listing Title */}
    <Link to={props.data.permalink} style={styles.listingContentLink}>
      <CardText style={styles.cardText}>
        {props.data.title}
      </CardText>
    </Link>
    <CardActions style={styles.cardActions}>
      <div style={styles.buttonSection}>
        {/* Vote Buttons */}
        <FlatButton
          disableTouchRipple={true}
          hoverColor={white}
          icon={fontIcon('arrow_upward')}
          label={props.data.score > 1
            ? numberFilter(props.data.score)
            : 'Vote'}
          labelStyle={styles.voteButtonText}
          style={styles.voteButton}
        />
        <FlatButton 
          disableTouchRipple={true}
          hoverColor={white}
          icon={fontIcon('arrow_downward')}
          style={styles.voteButton}
        />
      </div>
      <div style={styles.buttonSection}>
        {/* Comments Button */}
        <FlatButton
          disableTouchRipple
          hoverColor={white}
          icon={fontIcon('comment')}
          label={props.data.numComments > 0 
            ? numberFilter(props.data.numComments) 
            : 'Comment'}
          labelStyle={styles.commentsButtonLabel}
          style={styles.commentsButton}
        />
      </div>
    </CardActions>
  </Card>

export default ListingsFeedItem
