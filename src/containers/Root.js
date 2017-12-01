import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Listings from './Listings'
import Login from './Login'

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Listings}/>
        <Route path="/r/:subreddit/:sorting" component={Listings}/>
        <Route path="/r/:subreddit" component={Listings}/>
        <Route path="/:sorting" component={Listings}/>
      </Switch>
    </MuiThemeProvider>
  </Provider>

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root