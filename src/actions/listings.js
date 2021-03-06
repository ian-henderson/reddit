import { CALL_API, Schemas } from '../middleware/api'

export const listingsEndpoint = params => {
  let endpoint = ''
  if (params.subreddit) {
    endpoint += `/r/${params.subreddit.toLowerCase()}`
  }
  if (params.sorting) {
    endpoint += `/${params.sorting.toLowerCase()}`
  } else {
    endpoint += '/hot'
  }
  if (params.after) {
    endpoint += `?after=${params.after}`
  }

  return endpoint
}

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_SUCCESS = 'LISTINGS_SUCCESS'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

const fetchListings = (endpoint, schema) => ({
  [CALL_API]: {
    endpoint,
    schema,
    types: [LISTINGS_REQUEST, LISTINGS_SUCCESS, LISTINGS_FAILURE]
  }
})

export const loadListingsByEndpoint = endpoint => (dispatch, getState) => {
  endpoint = endpoint.toLowerCase()

  if (getState().pagination.listingsByEndpoint[endpoint]) return null

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}

export const loadListingsByName = ids => (dispatch, getState) => {
  const { listings } = getState().entities

  // Filters out listings that are already loaded.
  const namesToLoad = ids
    .map(id => 't3_' + id.toLowerCase())
    .filter(name => listings[name] ? null : name)

  // Exits if no listings need to be loaded.
  if (namesToLoad.length === 0) return null

  // Constructs an endpoint using the listing ids.
  const endpoint = '/by_id/' + namesToLoad.map((name, index) => {
    if (index !== namesToLoad.length - 1) name += ','
    return name
  })

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}