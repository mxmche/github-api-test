import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import { fetchForks } from '../actions'

class SearchResults extends Component {

    state = {
        repository: '',
        page: 1
    }

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

        this.setState({
            repository: queryParams.repository,
            page: queryParams.page
        })

        dispatch(fetchForks(queryParams))
    }

    render() {
        return (
            <>
                <h1>Results</h1>

                <Search onKeyPress={this.onKeyPress} />

                {
                    this.props.isFetching ? 
                        <div>Loading...</div> : 
                        this.renderTable(this.props.items)
                }
            </>
        )
    }

    onKeyPress = e => {
        const { dispatch } = this.props
        const keyCode = e.keyCode || e.which

        if (keyCode === 13) {
            if (/^\S+\/\S+$/.test(e.target.value)) {
                this.setState({
                    repository: e.target.value,
                    page: 1
                })
                dispatch(fetchForks({repository: e.target.value}))
            }
        }
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
            <>
                <div>
                    {this.renderPaging()}
                </div>
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
            </>
        )
    }

    renderPaging() {
        if (this.props.link) {
            const pages = this.props.link.split(',')

            return pages.map(page => {
                const relMatch = page.match(/rel="(\S+)"/)
                const pageNumber = page.match(/page=(\d+)/)[1]

                return (
                    <div style={{ float: 'left' }} key={relMatch[1]}>
                        <a href={`/search?page=${pageNumber}&repository=${this.state.repository}`}>{pageNumber}</a>
                        &nbsp;
                    </div>
                )
            })
        }

        return null
    }
}

function mapStateToProps(state) {
    const {
      isFetching,
      items,
      link
    } = state.forks || {
      isFetching: true,
      items: []
    }

    return {
      items,
      isFetching,
      link
    }
  }

export default connect(mapStateToProps)(SearchResults)