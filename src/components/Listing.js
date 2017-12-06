import React from 'react'
import moment from 'moment'
import Card, { CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card'
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
  cardHeaderSubtitle: {
    fontSize: '8pt'
  },
  cardHeaderText: {
    padding: '0px'
  },
  cardMediaRichContainer: {
    padding: '2px 16px'
  },
  cardMediaRichImage: {
    border: `0.5px solid ${grey300}`,
    height: '125px',
    maxHeight: '125px',
    maxWidth: '125px',
    objectFit: 'cover',
    width: '125px'
  },
  cardMediaRichOverlayContainer: {
    left: '1px',
    bottom: '1px',
    width: '127px'
  },
  cardMediaRichOverlayContent: {
    padding: '0'
  },
  cardMediaVideoImage: {
    objectFit: 'cover'
  },
  cardText: {
    padding: '0px 16px'
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
    fontSize: '10px',
    textTransform: 'none'
  },
  commentsButtonText: {
    fontSize: '10pt'
  },
  flexContainer: {
    display: 'flex'
  },
  voteButton: {
    color: grey600,
    minWidth: '30px'
  },
  voteButtonIcon: {
    fontSize: '10pt'
  },
  voteButtonText: {
    fontSize: '10px',
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
  return number >= 1000
    ? `${(number / 1000).toFixed(1)}k`
    : `${number}`
}

const subtitle = listingData => {
  const { subredditNamePrefixed, createdUtc, media, domain } = listingData
  const timeAgo = moment.unix(createdUtc).fromNow()
  let string = `${subredditNamePrefixed} • ${timeAgo}`
  if (!media && domain) string += ` • ${domain}`

  return string
}

const ListingContent = props => {
  /*
  if (props.data.media && props.data.media.oembed) {
    if (props.data.media.oembed.type === 'rich') {
      return (
        <div style={styles.flexContainer}>
          <CardText style={styles.cardTextFlex}>{props.data.title}</CardText>
          <div style={styles.cardMediaRichContainer}>
            <CardMedia overlay={<CardText style={styles.cardTextCaption}>{props.data.domain}</CardText>}
              overlayContainerStyle={styles.cardMediaRichOverlayContainer}
              overlayContentStyle={styles.cardMediaRichOverlayContent}>
              <img alt={props.data.title}
                src={props.data.media.oembed.thumbnailUrl}
                style={styles.cardMediaRichImage} />
            </CardMedia>
          </div>
        </div>
      )
    }
    // TODO: Instead of using the thumbnail url, an actual embedded iframe should be used.
    if (props.data.media.oembed.type === 'video') {
      return (
        <div>
          <CardText style={styles.cardText}>{props.data.title}</CardText>
          <CardMedia>
            <img alt={props.data.title}
              src={props.data.media.oembed.thumbnailUrl}
              style={styles.cardMediaVideoImage} />
          </CardMedia>
        </div>
      )
    }
  }
  */
  // Basic Listing
  return <CardText style={styles.cardText}>{props.data.title}</CardText>
}

const Listing = props =>
  <Card style={styles.card}>
    {/* Header */}
    <CardHeader
      iconStyle={styles.cardHeaderIcon}
      style={styles.cardHeader}
      subtitle={subtitle(props.data)}
      subtitleStyle={styles.cardHeaderSubtitle}
      textStyle={styles.cardHeaderText} />
    {/* Listing Title */}
    <ListingContent data={props.data} />
    <CardActions style={styles.cardActions}>
      <div style={styles.buttonSection}>
        {/* Vote Buttons */}
        <FlatButton
          disableTouchRipple
          hoverColor={white}
          icon={fontIcon('arrow_upward')}
          label={numberFilter(props.data.score)}
          labelStyle={styles.voteButtonText}
          style={styles.voteButton}
        />
        <FlatButton disableTouchRipple
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
          label={numberFilter(props.data.numComments)}
          labelStyle={styles.commentsButtonLabel}
          style={styles.commentsButton}
        />
      </div>
    </CardActions>
  </Card>

export default Listing