import React, { Component } from 'react'
import Home from './Home'
import SearchResults from './SearchResults'

class Main extends Component {

    state = {
        route: 'home'
    }

    componentDidMount() {
        window.location.hash = ''
    }

    changeView = () => {
        this.setState({ route: 'search' })
    }

    render() {
        const { route } = this.state

        if (route === 'home') {
            return <Home changeView={this.changeView} />
        }

        if (route === 'search') {
            return <SearchResults />
        }

        return <div>Not Found</div>
    }
}

export default Main