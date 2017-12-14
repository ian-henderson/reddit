import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import auth from './auth'
import paginate from './paginate'
import * as ActionTypes from '../actions'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { listings: {}, subredditsInfo: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  if (action.type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  }

  if (action.error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  listingsByEndpoint: paginate({
    mapActionToKey: action => action.endpoint,
    types: [
      ActionTypes.LISTINGS_REQUEST,
      ActionTypes.LISTINGS_SUCCESS,
      ActionTypes.LISTINGS_FAILURE
    ]
  }),
  subredditsInfoByEndpoint: paginate({
    mapActionToKey: action => action.endpoint,
    types: [
      ActionTypes.SUBREDDIT_INFO_REQUEST,
      ActionTypes.SUBREDDIT_INFO_SUCCESS,
      ActionTypes.SUBREDDIT_INFO_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  auth,
  entities,
  pagination,
  errorMessage
})

export default rootReducer
