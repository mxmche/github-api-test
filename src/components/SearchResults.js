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
        const { repository } = this.props.params

        return (
            <>
                <h1>{repository ? `Search results of ${repository}` : 'Results'}</h1>

                <Search onKeyPress={this.props.onKeyPress} />

                {
                    this.props.isFetching ? 
                        <Spinner intent={Intent.PRIMARY} /> : 
                        <Table items={this.props.items} params={this.props.params} />
                }
            </>
        )
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