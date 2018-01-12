import React from 'react'
import PropTypes from 'prop-types'
import { CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { grey600, white } from 'material-ui/styles/colors'

const fontIcon = name =>
  <FontIcon className='material-icons' style={{fontSize: '10pt'}}>
    {name}
  </FontIcon>

const numberFilter = number =>
  number >= 1000 
    ? `${(number / 1000).toFixed(1)}k` 
    : `${number}`

const styles = {
  voteButton: {
    color: grey600,
    fontSize: '10pt',
    minWidth: '30px'
  },
  voteButtonText: {
    fontSize: '10pt',
    padding: '0px 0px 0px 8px',
    textTransform: 'none'
  }
}

const ListingButtons = props =>
  <CardActions style={{padding: '2px 8px'}}>
    <div style={{display: 'inline-block'}}>
      {/* Vote Buttons */}
      <FlatButton
        disableTouchRipple={true}
        hoverColor={white}
        icon={fontIcon('arrow_upward')}
        label={props.score > 1 ? numberFilter(props.score) : 'Vote'}
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
    <div style={{display: 'inline-block'}}>
      {/* Comments Button */}
      <FlatButton
        disableTouchRipple
        hoverColor={white}
        icon={fontIcon('comment')}
        label={props.numComments > 0 ? numberFilter(props.numComments) : 'Comment'}
        labelStyle={{fontSize: '10pt', textTransform: 'none'}}
        style={{color: grey600}}
      />
    </div>
  </CardActions>

ListingButtons.propTypes = {
  numComments: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}

export default ListingButtons