import React, { Component } from 'react';

class TableCitySelector extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <label htmlFor="">Select a city</label>
                <select onChange={(e) => this.props.action(e.target.value)} id="city">
                    <option value="">Please select a city</option>
                    <option value="Denver">Denver</option>
                    <option value="Austin">Austin</option>
                    <option value="Boston">Boston</option>
                    <option value="Minneapolis">Minneapolis</option>
                    <option value="New York">New York</option>
                </select>
            </React.Fragment>
        )
    }
}

export default TableCitySelector;