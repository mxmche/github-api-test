import { searchForks } from './api'

export const REQUEST_FORKS = 'REQUEST_FORKS'
export const RECEIVE_FORKS = 'RECEIVE_FORKS'

function requestForks(params) {
  return {
    type: REQUEST_FORKS,
    params
  }
}

function receiveForks(params, json) {
  return {
    type: RECEIVE_FORKS,
    params,
    forks: json
  }
}

export function fetchForks(params) {
  return dispatch => {

    dispatch(requestForks(params))

    return searchForks(params.repository, params.page)
      .then(response => {
        params.link = response.headers.get('Link')
        return response.json()
      })
      .then(json => {
        dispatch(receiveForks(params, json))
      })
  }
}