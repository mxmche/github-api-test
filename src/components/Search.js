import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    render() {
        return (
            <div className="bp3-input-group .modifier fork-search_input">
                <span className="bp3-icon bp3-icon-search"></span>
                <input type="text" {...this.props} className="bp3-input" placeholder="Search" />
                <button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"></button>
            </div>
        )
    }
}

Search.propTypes = {
    onKeyPress: PropTypes.func
}

export default Search