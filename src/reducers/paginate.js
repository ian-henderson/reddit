import union from 'lodash/union'

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.')
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.')
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.')
  }

  const [ requestType, successType, failureType ] = types

  const updatePagination = (state = {
    isFetching: false,
    after: undefined,
    before: undefined,
    kind: undefined,
    pageCount: 0,
    ids: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        // If there is no action.response.result.data.children array,
        // then assume that the action is a single entity.
        // TODO: Find a better way to structure this.
        return {
          ...state,
          after: action.response.result.data.after,
          before: action.response.result.data.before,
          ids: union(state.ids, action.response.result.data.children),
          isFetching: false,
          kind: action.response.result.kind,
          pageCount: state.pageCount + 1
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}

export default paginate
