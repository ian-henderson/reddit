import axios from 'axios'
import { camelizeKeys } from 'humps'

export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST'
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS'
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE'

export const fetchToken = postData => {
  let url = `https://www.reddit.com/api/v1/access_token`

  if (postData.grantType) {
    url += `?grant_type=${postData.grantType}`

    // Retrieving the access token
    if (postData.grantType === 'authorization_code') {
      if (postData.code) {
        url += `&code=${postData.code}`
      } else {
        throw new Error('code missing from postData')
      }

      if (postData.redirectURI) {
        url += `&redirect_uri=${postData.redirectURI}`
      } else {
        throw new Error('redirectURI missing form postData')
      }
    }

    // Refreshing the token
    if (postData.grantType === 'refresh_token') {
      if (postData.refreshToken) {
        url += `&refresh_token=${postData.refreshToken}`
      } else {
        throw new Error('refreshToken missing from postData')
      }
    }
  } else {
    throw new Error('grantType missing from postData.')
  }

  const config = {
    auth: {
      username: process.env.REACT_APP_CLIENT_ID,
      password: process.env.REACT_APP_SECRET
    },
    method: 'POST',
    url
  }

  return axios(config)
}

export const initializeToken = code => dispatch => {
  dispatch({ type: FETCH_TOKEN_REQUEST })
  return fetchToken({
    grantType: 'authorization_code',
    redirectURI: process.env.REACT_APP_REDIRECT_URI,
    code
  })
  .then(response => {
    const camelizedJson = camelizeKeys(response.data)
    localStorage.setItem('lastUpdated', Date.now() / 1000)
    for (let i in camelizedJson) localStorage.setItem(i, camelizedJson[i])
    dispatch({ type: FETCH_TOKEN_SUCCESS, payload: camelizedJson })
  })
  .catch(error => {
    dispatch({ type: FETCH_TOKEN_FAILURE, error })
  })
}

export const LOGOUT = 'LOGOUT'

export const logOut = () => dispatch => {
  localStorage.clear()
  dispatch({ type: LOGOUT })
}