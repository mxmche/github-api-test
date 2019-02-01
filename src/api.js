import fetch from 'isomorphic-fetch'

const API_URL = 'https://api.github.com'

const searchForks = (repo, page) => {
    let query = ''

    if (page) {
      query = `?page=${page}`
    }

    return fetch(`${API_URL}/repos/${repo}/forks${query}`)
}

export { searchForks }