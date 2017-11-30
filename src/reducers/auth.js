import * as ActionCreators from '../actions'

export default (state = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  isFetching: false,
  lastUpdated: localStorage.getItem('lastUpdated'),

  // Token Data
  accessToken: localStorage.getItem('accessToken'),
  tokenType: localStorage.getItem('tokenType'),
  expiresIn: localStorage.getItem('expiresIn'),
  scope: localStorage.getItem('scope'),
  refreshToken: localStorage.getItem('refreshToken')
}, action) => {
  switch (action.type) {
    case ActionCreators.FETCH_TOKEN_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isFetching: true
      })
    case ActionCreators.FETCH_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isAuthenticated: true,
        isFetching: false
      })
    case ActionCreators.FETCH_TOKEN_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isFetching: false
      })
    default:
      return state
  }
}
