import { CALL_API, Schemas } from '../middleware/api'

export const VOTE_REQUEST = 'VOTE_REQUEST'
export const VOTE_SUCCESS = 'VOTE_SUCCESS'
export const VOTE_FAILURE = 'VOTE_FAILURE'

const vote = (endpoint, schema) => ({
  [CALL_API]: {
    types: [VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE],
    endpoint,
    method: 'POST',
    schema
  }
})

export const initializeVote = (direction, id) => (dispatch, getState) => {
  const endpoint = `/api/vote?dir=${direction}&id=${id}`

  // TODO: Make sure user hasn't already voted.

  return dispatch(vote(endpoint, Schemas.VOTE))
}