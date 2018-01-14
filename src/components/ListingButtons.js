import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { grey600, white } from 'material-ui/styles/colors'
import { handleVote } from '../actions'

const fontIcon = name =>
  <FontIcon className='material-icons' style={{fontSize: '10pt'}}>
    {name}
  </FontIcon>

const voteButtonStyle = (likes, direction) => {
  let color = grey600
  if (direction === 1 && likes === true) {
    color = 'orangered'
  } else if (direction === -1 && likes === false) {
    color = '#9698FC'
  }

  return {
    color,
    fontSize: '10pt',
    minWidth: '30px'
  }
}

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

class ListingButtons extends React.PureComponent {
  constructor(props) {
    super(props)
    this.boundActionCreators = bindActionCreators({ handleVote }, props.dispatch)
    this.numberFilter = this.numberFilter.bind(this)
    this.scoreFilter = this.scoreFilter.bind(this)
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

  render() {
    return (
      <CardActions style={{padding: '2px 8px'}}>
        <div style={{display: 'inline-block'}}>
          {/* Vote Buttons */}
          <FlatButton
            disableTouchRipple={true}
            hoverColor={white}
            icon={fontIcon('arrow_upward')}
            onClick={() => this.boundActionCreators.handleVote(1, this.props.name)}
            label={this.scoreFilter(this.props.score)}
            labelStyle={styles.voteButtonText}
            style={voteButtonStyle(this.props.likes, 1)}
          />
          <FlatButton
            disableTouchRipple={true}
            hoverColor={white}
            icon={fontIcon('arrow_downward')}
            onClick={() => this.boundActionCreators.handleVote(-1, this.props.name)}
            style={voteButtonStyle(this.props.likes, -1)}
          />
        </div>
        <div style={{display: 'inline-block'}}>
          {/* Comments Button */}
          <FlatButton
            disableTouchRipple
            hoverColor={white}
            icon={fontIcon('comment')}
            label={this.numberFilter(this.props.numComments)}
            labelStyle={{fontSize: '10pt', textTransform: 'none'}}
            style={{color: grey600}}
          />
        </div>
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