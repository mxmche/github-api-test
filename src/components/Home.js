import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import { setUrl } from './utils'

class Home extends Component {

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {
            if (/^\S+\/\S+$/.test(e.target.value)) {
                setUrl(1, e.target.value)
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