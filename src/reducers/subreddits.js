import union from 'lodash/union'
import * as ActionTypes from '../actions'

const subreddits = (state = { 
  ids: [],
  isFetching: false 
}, action) => {
  switch (action.type) {
    case ActionTypes.SUBREDDIT_INFO_REQUEST:
      return Object.assign({}, state, {
        ...state,
        isFetching: true
      })
    case ActionTypes.SUBREDDIT_INFO_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        ids: union(state.ids, [action.response.result.data])
      })
    case ActionTypes.SUBREDDIT_INFO_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isFetching: false
      })
    default:
      return state
  }
}

export default subreddits