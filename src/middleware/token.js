import { camelizeKeys } from 'humps'
import { fetchToken } from '../actions'
import * as ActionCreators from '../actions'

// A Redux middleware that checks to see if the oauth access token is expired
// before making a request to Reddit's API. Only actions that are functions are
// checked because the action being a function indicates that it is an async
// thunk, which are unique to API calls in the app.
// tl;dr: All functions are API calls.
export default store => next => action => {
  if (typeof action === 'function') {
    const { refreshToken, lastUpdated, expiresIn } = store.getState().auth
    const now = Date.now() / 1000
    const expired = lastUpdated && expiresIn && now > (Number(lastUpdated) + Number(expiresIn))

    if (expired) {
      if (refreshToken) {
        store.dispatch({ type: ActionCreators.FETCH_TOKEN_REQUEST })
        return fetchToken({
          grantType: 'refresh_token',
          refreshToken
        }).then(response => {
            localStorage.setItem('lastUpdated', Date.now() / 1000)
            const payload = camelizeKeys(response.data)
            for (let i in payload) localStorage.setItem(i, payload[i])
            store.dispatch({ type: ActionCreators.FETCH_TOKEN_SUCCESS, payload })
            next(action)
          })
          .catch(error => {
            store.dispatch({ type: ActionCreators.FETCH_TOKEN_FAILURE, error })
            next(action)
          })
      } else {
        throw new Error('Missing refresh token')
      }
    }
  }

  return next(action)
}
