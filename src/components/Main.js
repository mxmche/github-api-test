import React, { Component } from 'react'
import Home from './Home'
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

    changeView = () => {
        this.setState({ route: 'search' })
    }

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {

            if (/^\S+\/\S+$/.test(e.target.value)) {

                if (!/search/.test(window.location.href)) {
                    this.changeView()
                }

                setUrl(1, e.target.value)
            }
        }
    }

    render() {
        const { route } = this.state

        if (route === 'home') {
            return <Home changeView={this.changeView} onKeyPress={this.onKeyPress} />
        }

        if (route === 'search') {
            return <SearchResults onKeyPress={this.onKeyPress} />
        }

        return <div>Not Found</div>
    }
}

export default Main