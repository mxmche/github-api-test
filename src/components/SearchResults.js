import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ButtonGroup, Button, Intent, Spinner } from "@blueprintjs/core"
import Search from './Search'
import { fetchForks } from '../actions'
import { setUrl, getQueryParams } from './utils'

class SearchResults extends Component {

    constructor(props) {
        super(props)
        this.onHashChange = this.onHashChange.bind(this)
    }

    componentDidMount() {
        window.onhashchange = this.onHashChange
        this.onHashChange()
    }

    onHashChange() {
        const { dispatch } = this.props
        const hash = window.location.hash.replace(/[#/]+/, '')

        if (/search/.test(hash)) {
            dispatch(fetchForks(getQueryParams()))
        }
    }

    render() {
        const { repository } = this.props.params

        return (
            <>
                <h1>{repository ? `Search results of ${repository}` : 'Results'}</h1>

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
            setUrl(1, e.target.value)
        }
    }

    renderTable(items) {
        const rows = items.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.full_name}</td>
                    <td>{item.owner.login}</td>
                    <td>{item.stargazers_count}</td>
                    <td><a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.html_url}</a></td>
                </tr>
            )
        })

        return (
            <div className='fork-paging'>
                <div>
                    {this.renderPaging()}
                </div>
                <table className="bp3-html-table fork-table">
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
        const { link, repository, page } = this.props.params

        if (link) {
            let buttons = link.split(',').map(pageLink => {
                const rel = pageLink.match(/rel="(\S+)"/)[1]
                const pageNumber = pageLink.match(/page=(\d+)/)[1]

                return (
                    <Button onClick={() => setUrl(pageNumber, repository)} key={rel}>
                        {rel === 'first' ? 1 : pageNumber}
                    </Button>
                )
            })

            if (page === 1) {
                buttons = [
                    <Button key='current' disabled>{page}</Button>,
                    ...buttons
                ]
            } else {
                buttons = [
                    buttons[buttons.length - 1],
                    <Button key='current' disabled>{page}</Button>,
                    ...buttons.slice(0, -1)
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
      params
    } = state.forks || {
      isFetching: true,
      items: [],
      params: {}
    }

    return {
      items,
      isFetching,
      params
    }
}

SearchResults.propTypes = {
    link: PropTypes.string
}

export default connect(mapStateToProps)(SearchResults)