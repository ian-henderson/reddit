export * from './auth'
export * from './listings'
export * from './subreddits'
export * from './vote'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({ type: RESET_ERROR_MESSAGE })
