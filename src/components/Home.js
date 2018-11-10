import React, { Component } from 'react'
import Search from './Search'

class Home extends Component {

    onKeyPress = (e) => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {
            const [ owner, repoName ] = e.target.value.split('/')

            if (/^\S+\/\S+$/.test(e.target.value)) {
                window.location.href = `/search?page=1&repository=${owner}/${repoName}`
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