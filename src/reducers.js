import { combineReducers } from 'redux'
import { REQUEST_FORKS, RECEIVE_FORKS } from './actions'

const defaultState = {
  isFetching: false,
  items: [],
  params: {}
}

function forks(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_FORKS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_FORKS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.forks,
        params: action.params
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  forks
})

export default rootReducer