import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { grey300, grey600, white } from 'material-ui/styles/colors'
import { handleVote } from '../actions'

const styles = {
  buttonSection: {
    display: 'inline-block', 
    margin: '0', 
    textAlign: 'center', 
    width: '33%'
  },
  scoreText: {
    cursor: 'pointer',
    display: 'inline-block', 
    fontSize: '10pt', 
    height: '24px', 
    padding: '0', 
    verticalAlign: 'top', 
    lineHeight: '200%'
  },
  voteIconButton: {
    height: '24px', 
    margin: '0 8px', 
    padding: '0', 
    width: '24px'
  }
}

class ListingButtons extends React.PureComponent {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators({ handleVote }, props.dispatch)
    this.fontIcon = this.fontIcon.bind(this)
    this.numberFilter = this.numberFilter.bind(this)
    this.scoreFilter = this.scoreFilter.bind(this)
    this.voteButtonStyles = this.voteButtonStyles.bind(this)
    this.voteScoreTextStyles = this.voteScoreTextStyles.bind(this)
  }

  fontIcon(name) {
    return (
      <FontIcon className='material-icons' style={{fontSize: '10pt'}}>
        {name}
      </FontIcon>
    )
  }

  numberFilter(number) {
    if (number >= 1000) return `${(number / 1000).toFixed(1)}k`
    return String(number)
  }

  scoreFilter(score) {
    if (this.props.likes === true) score++
    else if (this.props.likes === false) score--
    return this.numberFilter(score)
  }

  voteButtonStyles(direction) {
    let color = grey600
    const { likes } = this.props
    if (direction === 1 && likes === true) color = 'orangered'
    else if (direction === -1 && likes === false) color = '#9698FC'
    return { color, fontSize: '10pt' }
  }

  voteScoreTextStyles() {
    let color = grey600
    const { likes } = this.props
    if (likes === true) color = 'orangered'
    else if (likes === false) color = '#9698FC'
    return { color, ...styles.scoreText }
  }

  render() {
    return (
      <CardActions style={{padding: '2px 8px'}}>
        <div style={styles.buttonSection}>
          {/* Upvote Arrow */}
          <IconButton 
            iconStyle={this.voteButtonStyles(1)} 
            style={styles.voteIconButton}
            onClick={() => this.boundActionCreators.handleVote(1, this.props.name)}
          >
            <FontIcon className='material-icons'color={grey600}>arrow_upward</FontIcon>
          </IconButton>
          {/* Score */}
          <CardText 
            onClick={() => this.boundActionCreators.handleVote(1, this.props.name)}
            style={this.voteScoreTextStyles()} 
          >
            {this.scoreFilter(this.props.score)}
          </CardText>
          {/* Downvote Arrow */}
          <IconButton 
            iconStyle={this.voteButtonStyles(-1)} 
            style={styles.voteIconButton}
            onClick={() => this.boundActionCreators.handleVote(-1, this.props.name)}
          >
            <FontIcon className='material-icons'color={grey600}>arrow_downward</FontIcon>
          </IconButton>
        </div>
        <span style={{borderLeft: `1px solid ${grey300}`}} />
        {/* Comments Button */}
        <div style={styles.buttonSection}>
          <FlatButton
            hoverColor={white}
            icon={this.fontIcon('comment')}
            label={this.numberFilter(this.props.numComments)}
            labelStyle={{fontSize: '10pt', textTransform: 'none'}}
            style={{color: grey600, display: 'inline-block'}}
          />
        </div>
        <span style={{borderLeft: `1px solid ${grey300}`}} />
      </CardActions>
    )
  }
}

ListingButtons.propTypes = {
  likes: PropTypes.bool,
  name: PropTypes.string.isRequired,
  numComments: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({})

export default connect(mapStateToProps)(ListingButtons)