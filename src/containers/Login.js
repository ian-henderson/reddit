import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { parse } from 'query-string'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { initializeToken } from '../actions'
import PageOuterContainer from '../components/PageOuterContainer'

const authorizationURL = width =>
  `https://www.reddit.com/api/v1/authorize` +
  `${width && width > 590 ? '' : '.compact'}` +
  `?client_id=${process.env.REACT_APP_CLIENT_ID}` +
  `&response_type=code` +
  `&state=${localStorage.getItem('authState')}` +
  `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
  `&duration=permanent` +
  `&scope=read vote`

const randomString = length => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

const styles = {
  loginTitle: {
    fontSize: '27px',
    fontWeight: 'bold',
    lineHeight: '32px',
    marginBottom: '10px'
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: null, height: null }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.boundActionCreators = bindActionCreators({ initializeToken }, props.dispatch)
  }

  componentWillMount() {
    // Redirects to '/' if authenticated.
    if (this.props.isAuthenticated) {
      this.props.history.push('/')
      // If not authenticated, it makes sure that the authState is set.
    } else if (!localStorage.getItem('authState')) {
      localStorage.setItem('authState', randomString(10))
    }
  }

  componentDidMount() {
    // Adds an event listener that updates the state on resize.
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    // When redirected back to this page from reddit.com, this checks the auth
    // state for consistency and fetches an OAuth token.
    const { state, code, error } = parse(this.props.location.search)
    if (state && code) {
      if (state === localStorage.getItem('authState')) {
        this.boundActionCreators.initializeToken(code)
      } else {
        console.log('Authorization Error: Invalid state.')
      }
    }
    if (state && error) console.log(error)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      localStorage.removeItem('authState')
      this.props.history.push('/')
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    return (
      <div>
        <AppBar
          title='Reddit'
          style={{position: 'fixed', top: '0'}}
          showMenuIconButton={false}
        />
        <PageOuterContainer>
          <div style={{margin: 'auto', maxWidth: '588px', padding: '24px'}}>
            <h1 style={styles.loginTitle}>Login</h1>
            <p>Connect to your reddit account.</p>
            <RaisedButton
              label='Connect'
              primary={true}
              href={authorizationURL(this.state.width)}
            />
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default withRouter(connect(mapStateToProps)(Login))