import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'

class Home extends Component {

    render() {
        return (
            <>
                <h1>Welcome</h1>
                <Search onKeyPress={this.props.onKeyPress} />
            </>
        )
    }
}

Home.propTypes = {
    changeView: PropTypes.func
}

export default Home