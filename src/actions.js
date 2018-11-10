import fetch from 'isomorphic-fetch'

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

    let query = ''
    if (params.page) {
      query = `?page=${params.page}`
    }

    return fetch(`https://api.github.com/repos/${params.repository}/forks${query}`)
      .then(response => {
        params.link = response.headers.get('Link')
        return response.json()
      })
      .then(json => {
        dispatch(receiveForks(params, json))
      })
  }
}