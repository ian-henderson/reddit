import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Listings from './Listings'
import Login from './Login'

const Root = ({ store }) =>
  <Provider store={store}>
    <MuiThemeProvider>
      <Route exact path="/" component={Listings}/>
      <Route path="/login" component={Login}/>
    </MuiThemeProvider>
  </Provider>

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root