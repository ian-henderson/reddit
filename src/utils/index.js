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

export const randomString = length => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}
