import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import token from '../middleware/token'
import rootReducer from '../reducers'

const composeEnhancers = composeWithDevTools({})

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(token, thunk, api))
)

export default configureStore
