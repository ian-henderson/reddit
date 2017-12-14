import { CALL_API, Schemas } from '../middleware/api'

export const SUBREDDIT_INFO_REQUEST = 'SUBREDDIT_INFO_REQUEST'
export const SUBREDDIT_INFO_SUCCESS = 'SUBREDDIT_INFO_SUCCESS'
export const SUBREDDIT_INFO_FAILURE = 'SUBREDDIT_INFO_FAILURE'

const fetchSubredditInfo = (endpoint, schema) => ({
  [CALL_API]: {
    types: [
      SUBREDDIT_INFO_REQUEST,
      SUBREDDIT_INFO_SUCCESS,
      SUBREDDIT_INFO_FAILURE
    ],
    schema,
    endpoint
  }
})

export const loadSubredditInfo = subreddit => (dispatch, getState) => {
  const endpoint = `/r/${subreddit.toLowerCase()}/about`

  return dispatch(fetchSubredditInfo(endpoint, Schemas.SUBREDDIT_INFO))
}