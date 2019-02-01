import React, { Component } from 'react'
import SearchResults from './SearchResults'
import { setUrl } from './utils'

class Main extends Component {

    state = {
        route: 'home'
    }

    componentDidMount() {
        if (/search/.test(window.location.hash)) {
            this.setState({ route: 'search' })
        }
    }

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {

            if (/^\S+\/\S+$/.test(e.target.value)) {

                if (!/search/.test(window.location.href)) {
                    this.setState({ route: 'search' })
                }

                setUrl(e.target.value, 1)
            }
        }
    }

    render() {
        return (
            <SearchResults
                route={this.state.route}
                onKeyPress={this.onKeyPress}
            />
        )
    }
}

export default Main