import merge from 'lodash/merge'
import { parse } from 'query-string'
import * as ActionTypes from '../actions'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { listings: {}, subreddits: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  // Updates cached listing when user votes.
  if (action.type === ActionTypes.VOTE_REQUEST) {
    const queryString = action.endpoint.split('?')[1]
    const { id, dir } = parse(queryString)
    let likes = null
    if (Number(dir) === 1) likes = true
    else if (Number(dir) === -1) likes = false
    const stateToUpdate = { 
      listings: { 
        [id]: { data: { likes } } 
      } 
    }

    return merge({}, state, stateToUpdate)
  }

  return state
}

export default entities