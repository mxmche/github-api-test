import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Intent, Spinner } from '@blueprintjs/core'
import Search from './Search'
import { fetchForks } from '../actions'
import { getQueryParams } from './utils'
import Table from './Table'

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
        return (
            <>
                {this.renderTitle()}
                <Search onKeyPress={this.props.onKeyPress} />
                {this.renderTable()}
            </>
        )
    }

    renderTitle() {
        const { route, params } = this.props
        const { repository } = params
        let title = ''

        if (route === 'home') {
            title = 'Home'
        } else {
            if (repository) {
                title = `Search results of ${repository}`
            } else {
                title = 'Results'
            }
        }

        return <h1>{title}</h1>
    }

    renderTable() {
        const { route, isFetching, params, items } = this.props

        if (route === 'search') {
            if (isFetching) {
                return <Spinner intent={Intent.PRIMARY} />
            } else {
                return <Table items={items} params={params} />
            }
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
    items: PropTypes.array,
    isFetching: PropTypes.bool,
    params: PropTypes.shape({
        link: PropTypes.string,
        repository: PropTypes.string,
        page: PropTypes.string
    })
}

export default connect(mapStateToProps)(SearchResults)