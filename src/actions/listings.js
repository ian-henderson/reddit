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

export const loadListings = endpoint => (dispatch, getState) => {
  if (getState().pagination.listingsByEndpoint[endpoint]) {
    return null
  }

  return dispatch(fetchListings(endpoint))
}