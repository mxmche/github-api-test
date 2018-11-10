import { combineReducers } from 'redux'
import { REQUEST_FORKS, RECEIVE_FORKS } from './actions'

function forks(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_FORKS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_FORKS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.forks,
        link: action.params.link
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  forks
})

export default rootReducer