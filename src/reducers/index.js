import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import auth from './auth'
import paginate from './paginate'
import subreddits from './subreddits'
import * as ActionTypes from '../actions'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { listings: {}, subreddits: {} }, action) => {
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
  })
})

const rootReducer = combineReducers({
  auth,
  entities,
  errorMessage,
  pagination,
  subreddits
})

export default rootReducer
