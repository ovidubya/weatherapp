import React, { Component } from 'react';


class TableCityHeader extends Component {
    constructor(props) {
        super(props);
    }

    renderMessage() {
        var dyanmmicCodedCity = this.props.dyanmmicCodedCity;
        var hardCodedCity = this.props.hardCodedCity;
        if(!!dyanmmicCodedCity && !!hardCodedCity) {
            var temp = hardCodedCity.temp;
            var temp2 = dyanmmicCodedCity.temp;
            console.log('The value of temp' + temp)
            console.log('The value of temp2' + temp2)
            if(typeof temp !== 'undefined' && typeof temp2 !== 'undefined') {
                var message = `The average tempature is ${((temp + temp2) / 2).toFixed(2)} and hottest city is ${temp > temp2 ? 'Chicago' : dyanmmicCodedCity.name }`;
                console.log(message);
                return message;
            }
        }

    }
  
    render() {
        return (
            <React.Fragment>
                <h2>
                    {this.renderMessage()}
                </h2>
            </React.Fragment>
        );
  }
}

export default TableCityHeader;
