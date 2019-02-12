import React, { Component } from 'react';
import { reset } from 'ansi-colors';


class TableCityForecast extends Component {
    constructor(props) {
        super(props);

    }
    printNested(obj) {
        var objResult = Object.keys(obj).map(function(key) {
            return [(key) + ' ' + obj[key]];
        });
        return (
            <ul>
                {objResult.map((el, index) => <li>{el}</li> )}
            </ul>
        )
    }
    renderForcast() {
        if(this.props.astro && this.props.day) {
            var astro = this.props.astro;
            var day = this.props.day;
            var astroResult = Object.keys(astro).map(function(key) {
                return [(key) + ' ' + astro[key]];
            });
            var dayResult = Object.keys(day).map(function(key) {
                return [(key) + ' ' + (typeof day[key] === 'object' ? JSON.stringify(day[key]) : day[key] )];
            });
            console.log(dayResult);
            return (
                <React.Fragment>
                    <ul>
                        {astroResult.map((el, index) => <li>{el}</li> )}
                    </ul>
                    <ul>
                        {dayResult.map((el, index) => <li>{el}</li> )}
                    </ul>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div id="forecast">
                {this.renderForcast()}
            </div>
        )
    }
}

export default TableCityForecast;