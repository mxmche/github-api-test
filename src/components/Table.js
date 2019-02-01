import React, { Component } from 'react'
import { ButtonGroup, Button } from '@blueprintjs/core'
import { setUrl } from './utils'

class Table extends Component {
    render() {
        const rows = this.props.items.map(item => {
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

export default Table