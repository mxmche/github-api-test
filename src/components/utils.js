/**
 * @param {Number} page Page number of fork list
 * @param {*} repo A repository name
 */
const setUrl = (page, repo) => {
    window.location.hash = `search?page=${page}&repository=${repo}`
}

/**
 * @returns {Object}
 */
const getQueryParams = () => {
    const searchQuery = window.location.hash.replace(/#search\?/, '')
    const queryParams = {}

    if (searchQuery) {
        const query = searchQuery
        const params = query.split('&')

        if (params && params.length) {
            params.forEach((p) => {
                const [ key, value ] = p.split('=')
                queryParams[key] = value
            })
        }
    }

    return queryParams
}

export { setUrl, getQueryParams }