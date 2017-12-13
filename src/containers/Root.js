import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Listing from './Listing'
import Listings from './Listings'
import Login from './Login'

const muiTheme = getMuiTheme({
  appBar: {
    height: 46
  }
})

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Listings}/>
        <Route path="/r/:subreddit/comments/:id/:slug" component={Listing}/>
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