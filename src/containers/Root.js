import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Reboot from 'material-ui/Reboot'
import { MuiThemeProvider } from 'material-ui/styles'
import Listing from './Listing'
import Listings from './Listings'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider>
      <Reboot />
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Listings} />
        <ProtectedRoute path="/r/:subreddit/comments/:id/:slug" component={Listing} />
        <ProtectedRoute path="/r/:subreddit/:sorting" component={Listings} />
        <ProtectedRoute path="/r/:subreddit" component={Listings} />
        <ProtectedRoute path="/:sorting" component={Listings} />
      </Switch>
    </MuiThemeProvider>
  </Provider>

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root