import { CALL_API, Schemas } from '../middleware/api'

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_SUCCESS = 'LISTINGS_SUCCESS'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

const fetchListings = endpoint => ({
  [CALL_API]: {
    types: [
      LISTINGS_REQUEST,
      LISTINGS_SUCCESS,
      LISTINGS_FAILURE
    ],
    schema: Schemas.LISTINGS,
    endpoint
  }
})

export const loadListingsByEndpoint = endpoint => (dispatch, getState) => {
  if (getState().pagination.listingsByEndpoint[endpoint]) {
    return null
  }

  return dispatch(fetchListings(endpoint))
}

export const loadListingsByName = names => (dispatch, getState) => {
  const { listings } = getState().entities
  const namesToLoad = (accumulator, name) => {
    if (!listings[name]) return name + ' '
  }
  const endpoint = '/by_id/' + names.reduce(namesToLoad)

  return dispatch(fetchListings(endpoint))
}