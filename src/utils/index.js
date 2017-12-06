// TODO: Wrap the API endpoints into one function.

export const mySubredditsEndpoint = params => {
  let endpoint = `/subreddits/mine/${params.where}`
  if (params.after) {
    endpoint += `?after=${params.after}`
  }

  return endpoint
}

export const listingsEndpoint = params => {
  let endpoint = ''
  if (params.subreddit) {
    endpoint += `/r/${params.subreddit}`
  }
  if (params.sorting) {
    endpoint += `/${params.sorting}`
  } else {
    endpoint += '/hot'
  }
  if (params.after) {
    endpoint += `?after=${params.after}`
  }

  return endpoint
}

export const randomString = length => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
