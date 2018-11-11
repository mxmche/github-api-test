import React, { Component } from 'react'
import Search from './Search'

class Home extends Component {

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {
            const [ owner, repoName ] = e.target.value.split('/')

            if (/^\S+\/\S+$/.test(e.target.value)) {
                window.location.hash = `search?repository=${owner}/${repoName}&page=1`
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

export default Home