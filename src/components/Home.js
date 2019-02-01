import React from 'react'
import Search from './Search'

function Home(props) {
    return (
        <>
            <h1>Welcome</h1>
            <Search onKeyPress={props.onKeyPress} />
        </>
    )
}

export default Home