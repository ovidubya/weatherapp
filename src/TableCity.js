import React, { Component } from 'react';


class TableCity extends Component {
    constructor(props) {
        super(props);
    }

    renderConditions() {
        if(this.props.data.isConditions) {
            return (
                <tr><td>{this.props.data.isConditions}</td></tr>
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.data.name} <button onClick={() => this.props.forecast(this.props.data.name)} >Forcast</button> </td>
                    <td>{this.props.data.lc}</td>
                    <td>{this.props.data.temp}</td>
                    <td>{this.props.data.windSpeed}</td>
                    <td>{this.props.data.vis}</td>
                </tr>
                {this.renderConditions()}
            </React.Fragment>
        )
    }
}

export default TableCity;