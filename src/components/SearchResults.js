import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import { fetchForks } from '../actions'

class SearchResults extends Component {

    componentDidMount() {
        const searchQuery = window.location.search
        const { dispatch } = this.props
        const queryParams = {}

        if (searchQuery) {
            const query = searchQuery.replace('?', '')
            const params = query.split('&')

            if (params && params.length) {
                params.forEach((p) => {
                    const [ key, value ] = p.split('=')
                    queryParams[key] = value
                })
            }
        }

        dispatch(fetchForks(queryParams))
    }

    render() {
        return (
            <>
                <h1>Results</h1>

                <Search />

                {
                    this.props.isFetching ? 
                        <div>Loading...</div> : 
                        this.renderTable(this.props.items)
                }
            </>
        )
    }

    renderTable(items) {
        const rows = items.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.full_name}</td>
                    <td>{item.owner.login}</td>
                    <td>{item.stargazers_count}</td>
                    <td><a href={item.html_url}>{item.html_url}</a></td>
                </tr>
            )
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Owner</th>
                        <th>Stars</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    const {
      isFetching,
      items
    } = state.forks || {
      isFetching: true,
      items: []
    }

    return {
      items,
      isFetching
    }
  }

export default connect(mapStateToProps)(SearchResults)