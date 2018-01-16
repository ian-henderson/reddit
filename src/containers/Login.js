import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { bindActionCreators } from "redux"
import { parse } from "query-string"
import LoginDesktopPage from "../components/LoginDesktopPage"
import LoginMobilePage from "../components/LoginMobilePage"
import { initializeToken } from "../actions"

const authorizationURL = width =>
  `https://www.reddit.com/api/v1/authorize` +
  `${width && width > 590 ? "" : ".compact"}` +
  `?client_id=${process.env.REACT_APP_CLIENT_ID}` +
  `&response_type=code` +
  `&state=${localStorage.getItem("authState")}` +
  `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
  `&duration=permanent` +
  `&scope=read vote`

const randomString = length => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { width: null, height: null }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.boundActionCreators = bindActionCreators({ initializeToken }, props.dispatch)
  }

  componentWillMount() {
    // Redirects to "/" if authenticated.
    if (this.props.isAuthenticated) {
      this.props.history.push("/")
      // If not authenticated, it makes sure that the authState is set.
    } else if (!localStorage.getItem("authState")) {
      localStorage.setItem("authState", randomString(10))
    }
  }

  componentDidMount() {
    // Adds an event listener that updates the state on resize.
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)

    // When redirected back to this page from reddit.com, this checks the auth
    // state for consistency and fetches an OAuth token.
    const { state, code, error } = parse(this.props.location.search)
    if (state && code) {
      if (state === localStorage.getItem("authState")) {
        this.boundActionCreators.initializeToken(code)
      } else {
        console.log("Authorization Error: Invalid state.")
      }
    }
    if (state && error) console.log(error)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      localStorage.removeItem("authState")
      this.props.history.push("/")
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    if (this.state.width > 590) {
      return (
        <LoginDesktopPage authorizationURL={authorizationURL(this.state.width)} />
      )
    }
    return (
      <LoginMobilePage authorizationURL={authorizationURL(this.state.width)} />
    )
  }
}

const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated })

export default withRouter(connect(mapStateToProps)(Login))