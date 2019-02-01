import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ButtonGroup, Button, Intent, Spinner } from "@blueprintjs/core"
import Search from './Search'
import { fetchForks } from '../actions'

class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.onHashChange = this.onHashChange.bind(this)
        this.state = {
            repository: '',
            page: 1
        }
    }

    componentDidMount() {
        window.onhashchange = this.onHashChange
        this.onHashChange()
    }

    /**
     * @returns {Object}
     */
    getQueryParams() {
        const searchQuery = window.location.hash.replace(/#search\?/, '')
        const queryParams = {}

        if (searchQuery) {
            const query = searchQuery
            const params = query.split('&')

            if (params && params.length) {
                params.forEach((p) => {
                    const [ key, value ] = p.split('=')
                    queryParams[key] = value
                })
            }
        }

        return queryParams
    }

    onHashChange() {
        const { dispatch } = this.props
        const hash = window.location.hash.replace(/[#/]+/, '')

        if (/search/.test(hash)) {
            const queryParams = this.getQueryParams()

            this.setState({
                repository: queryParams.repository,
                page: Number(queryParams.page) 
            })

            dispatch(fetchForks(queryParams))
        }
    }

    render() {
        return (
            <>
                <h1>Results</h1>

                <Search onKeyPress={this.onKeyPress} />

                {
                    this.props.isFetching ? 
                        <Spinner intent={Intent.PRIMARY} /> : 
                        this.renderTable(this.props.items)
                }
            </>
        )
    }

    onKeyPress = e => {
        const keyCode = e.keyCode || e.which

        if (keyCode === 13 && /^\S+\/\S+$/.test(e.target.value)) {
            window.location.hash = `search?page=1&repository=${e.target.value}`
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
            <div style={{ marginTop: '10px'}}>
                <div>
                    {this.renderPaging()}
                </div>
                <table className="bp3-html-table" style={{ margin: '0 auto' }}>
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
            </div>
        )
    }

    renderPaging() {
        const { link } = this.props
        const currentPage = this.state.page

        if (link) {
            const pages = link.split(',')
            let buttons = pages.map(page => {
                const rel = page.match(/rel=\"(\S+)\"/)[1]
                const pageNumber = page.match(/page=(\d+)/)[1]
                const onClick = () => {
                    window.location.hash = `search?page=${pageNumber}&repository=${this.state.repository}`
                }
                const title = rel === 'first' ? rel : pageNumber

                return <Button onClick={onClick} key={rel}>{title}</Button>
            })

            if (currentPage == 1) {
                buttons = [
                    <Button key='current' disabled>{currentPage}</Button>,
                    ...buttons
                ]
            } else {
                buttons = [
                    buttons[0],
                    <Button key='current' disabled>{currentPage}</Button>,
                    ...buttons.slice(1)
                ]
            }

            return (
                <ButtonGroup>
                    {buttons}
                </ButtonGroup>
            )
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

SearchResults.propTypes = {
    link: PropTypes.string
}

export default connect(mapStateToProps)(SearchResults)