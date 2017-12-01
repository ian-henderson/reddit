import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { parse } from 'query-string'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { initializeToken } from '../actions'
import { randomString } from '../utils'
import PageContainer from '../components/PageContainer'

const styles = {
  login: {
    maxWidth: '900px',
    paddingTop: '40px'
  },
  loginTitle: {
    fontSize: '27px',
    fontWeight: 'bold',
    lineHeight: '32px',
    marginBottom: '10px'
  },
  loginAppbar: {
    position: 'fixed',
    top: '0'
  },
  loginButton: {
    margin: '12'
  }
}

const authorizationURL = width =>
  `https://www.reddit.com/api/v1/authorize` +
  `${width && width > 590 ? '' : '.compact'}` +
  `?client_id=${process.env.REACT_APP_CLIENT_ID}` +
  `&response_type=code` +
  `&state=${localStorage.getItem('authState')}` +
  `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
  `&duration=permanent` +
  `&scope=mysubreddits read`


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: null, height: null }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.boundActionCreators = bindActionCreators({ initializeToken }, props.dispatch)
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/')
    } else if (!localStorage.getItem('authState')) {
      localStorage.setItem('authState', randomString(10))
    }
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
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
          style={styles.loginAppBar}
          showMenuIconButton={false}
        />
        <PageContainer>
          <div style={styles.login}>
            <h1 style={styles.loginTitle}>Login</h1>
            <p>Connect this Reddit client to your account.</p>
            <RaisedButton
              label='Connect'
              style={styles.loginButton}
              primary={true}
              href={authorizationURL(this.state.width)}
            />
          </div>
        </PageContainer>
      </div>
    )
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default withRouter(connect(mapStateToProps)(Login))