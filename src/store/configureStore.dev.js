import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import api from '../middleware/api'
import token from '../middleware/token'
import rootReducer from '../reducers'

const composeEnhancers = composeWithDevTools({})

const configureStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState, composeEnhancers(
    applyMiddleware(thunk, token, api)
  ))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
