import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'

class Home extends Component {

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {
            if (/^\S+\/\S+$/.test(e.target.value)) {
                window.location.hash = `search?repository=${e.target.value}&page=1`
                this.props.changeView()
            }
        }
    }

    render() {
        return (
            <>
                <h1>Welcome</h1>
                <Search onKeyPress={this.onKeyPress} />
            </>
        )
    }
}

Home.propTypes = {
    changeView: PropTypes.func
}

export default Home