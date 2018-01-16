import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Listing from './Listing'
import Listings from './Listings'
import Login from './Login'
import theme from '../theme'
import ProtectedRoute from './ProtectedRoute'

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
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