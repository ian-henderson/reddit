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
  if (getState().pagination.listingsByEndpoint[endpoint]) return null

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}

export const loadListingsByName = (prefix, names) => (dispatch, getState) => {
  const { listings } = getState().entities

  // Filters out listings that are already loaded.
  const namesToLoad = names.filter(name => 
    listings[name.toLowerCase()] ? null : name.toLowerCase())
  // Exits if no listings need to be loaded.
  if (namesToLoad.length === 0) return null
  const endpoint = '/by_id/' + namesToLoad.map((name, index) => {
    let id = prefix + name
    if (index !== namesToLoad.length - 1) id += ','
    return id
  })

  return dispatch(fetchListings(endpoint, Schemas.LISTINGS))
}