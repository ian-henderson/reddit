import { CALL_API, Schemas } from '../middleware/api'

export const VOTE_REQUEST = 'VOTE_REQUEST'
export const VOTE_SUCCESS = 'VOTE_SUCCESS'
export const VOTE_FAILURE = 'VOTE_FAILURE'

const vote = (endpoint, schema) => ({
  [CALL_API]: {
    endpoint,
    method: 'POST',
    schema,
    types: [VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE]
  }
})

export const handleVote = (direction, name) => (dispatch, getState) => {
  const { listings } = getState().entities
  const listing = listings[name]

  // Exit if direction isn't 1 or -1.
  if (Math.abs(direction) !== 1) return null

  // Exits if listing doesn't exist.
  if (!listing) return null

  let endpoint = `/api/vote?dir=${direction}&id=${name}`

  // If User already liked listing & upvotes, set direction to 0 & vice versa.
  const { likes } = listing.data
  if ((likes === true && direction === 1) || 
      (likes === false && direction === -1)) {
    endpoint = `/api/vote?dir=0&id=${name}`
  }

  return dispatch(vote(endpoint, Schemas.VOTE))
}