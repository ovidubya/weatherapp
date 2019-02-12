import React, { Component } from 'react';


class TableCityRefreshBtn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <button onClick={(e) => this.props.action('all')}>Refresh</button>
            </React.Fragment>
        )
    }
}

export default TableCityRefreshBtn;