import { CALL_API, Schemas } from '../middleware/api'

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_SUCCESS = 'LISTINGS_SUCCESS'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

const fetchListings = (endpoint, schema) => ({
  [CALL_API]: {
    types: [
      LISTINGS_REQUEST,
      LISTINGS_SUCCESS,
      LISTINGS_FAILURE
    ],
    schema,
    endpoint
  }
})

export const loadListingsByEndpoint = endpoint => (dispatch, getState) => {
  if (getState().pagination.listingsByEndpoint[endpoint]) {
    return null
  }

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}

export const loadListingsByName = (prefix, names) => (dispatch, getState) => {
  const { listings } = getState().entities
  const namesToLoad = []
  for (let name in names) {
    if (!listings[names[name]]) namesToLoad.push(names[name])
  }
  if (namesToLoad.length === 0) return null
  const endpoint = '/by_id/' + namesToLoad.map(name => prefix + name)

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}

export const loadSubredditAbout = subreddit => (dispatch, getState) => {
  const endpoint = `/r/${subreddit}/about`

  return dispatch(fetchListings(endpoint, Schemas.SUBREDDIT))
}