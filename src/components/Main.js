import React from 'react'
import Home from './Home'
import SearchResults from './SearchResults'

function Main() {
    const path = window.location.pathname
    const query = window.location.search

    if (path === '/') {
        return <Home />
    }

    if (path === '/search') {
        return <SearchResults />
    }

    return <div>Not Found</div>
}

export default Main