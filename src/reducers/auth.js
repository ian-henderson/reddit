import * as ActionCreators from '../actions'

export default (state = {
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  isFetching: false,
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
    case ActionCreators.LOGOUT:
      return Object.assign({}, state, {
        ...state,
        isAuthenticated: false
      })
    default:
      return state
  }
}
