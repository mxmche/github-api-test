import React, { Component } from 'react'

class Search extends Component {

    render() {
        return (
            <>
                <label>Search: </label>
                <input type="text" {...this.props} />
            </>
        )
    }
}

export default Search