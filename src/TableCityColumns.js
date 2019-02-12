import React, { Component } from 'react';


class TableCityColumns extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <tr>
                <td>City</td>
                <td>Locale</td>
                <td>Temperature Celsius</td>
                <td>Wind Speed KPH</td>
                <td>Visibility KM</td>
            </tr>
        );
  }
}

export default TableCityColumns;
