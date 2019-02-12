import React from 'react';

import TableCityColumns from './TableCityColumns';
import TableCity from './TableCity';
import TableCitySelector from './TableCitySelector';
import TableCityRefreshBtn from './TableCityRefreshBtn';
import TableCityForecast from './TableCityForecast';
import TableCityHeader from './TableCityHeader';

export default class TableCityView extends React.Component {
    constructor(props) {
        super(props);
        var api_key = "71d7da8bdceb43d4bbf55709181511";
        
        this.state = {
            url: "http://api.apixu.com/v1/forecast.json?key=" + api_key  + '&days=2',
            dyanmmicCodedCity: {
                name: '',
                lc: '',
                temp: '',
                windSpeed: '',
                vis: '',
                isConditions: false
            },
            hardCodedCity: {
                name: '',
                lc: '',
                temp: '',
                windSpeed: '',
                vis: '',
                isConditions: false
            }
        };
        
        this.childHandler = this.childHandler.bind(this);
        this.forcastHandler = this.forcastHandler.bind(this);
    }
    componentDidMount() {

        fetch(this.state.url + `&q=${this.props.cityName}`).then(res => {
            if(res.status !== 200) {
                document.getElementById('errorLogs').innerHTML += 'Error Code: ' + res.status + '. Error Message: ' + res.statusText;
                return res.json();
            }else {
                console.log(res);
                return res.json();
            }
        }).then(data => {
             this.setState({
                dyanmmicCodedCity: {
                    name: 'Denver',
                    lc: '',
                    temp: '',
                    windSpeed: '',
                    vis: '',
                    isConditions: false
                },
                hardCodedCity: {
                    name: this.props.cityName,
                    lc: data.current.last_updated,
                    temp: data.current.temp_c + data.current.feelslike_c ,
                    windSpeed: data.current.wind_kph,
                    vis: data.current.vis_km,
                    isConditions: (data.current.temp_c + data.current.feelslike_c <= 20 ? data.current.condition.text : false)
                }
            });
        });
    }
    getWeatherJSON(q,api_key) {
        return fetch((!!api_key ? api_key : this.state.url) + `&q=${q}`).then(res => {
            if(res.status !== 200) {
                document.getElementById('errorLogs').innerHTML += 'Error Code: ' + res.status + '. Error Message: ' + res.statusText;
                return res.json();
            }else {
                return res.json();
            }
        }).then(data => {
             return data;
        }).catch(err => {
            console.log(err);
        });
    }


    async childHandler(dataFromChild) {
        if(dataFromChild == 'all') {
            dataFromChild = document.getElementById('city').value;
            this.setState({
                astro: false,
                day: false
            });
            var errorLogs = document.getElementById('errorLogs');
            if(!!errorLogs) {
                errorLogs.innerHTML = '';
            }
        }
        var dynamicCityWeatherData = await this.getWeatherJSON(dataFromChild);
        var hardcodedCityWeatherData = await this.getWeatherJSON(this.props.cityName);
        if(!dynamicCityWeatherData.error && !hardcodedCityWeatherData.error) { //make sure we get a proper val
            this.setState({
                dyanmmicCodedCity: {
                    name: dataFromChild,
                    lc: dynamicCityWeatherData.current.last_updated,
                    temp: dynamicCityWeatherData.current.temp_c + dynamicCityWeatherData.current.feelslike_c ,
                    windSpeed: dynamicCityWeatherData.current.wind_kph,
                    vis: dynamicCityWeatherData.current.vis_km,
                    isConditions: (dynamicCityWeatherData.current.temp_c + dynamicCityWeatherData.current.feelslike_c <= 20 ? dynamicCityWeatherData.current.condition.text : false)
                },
                hardCodedCity: {
                    name: 'Chicago',
                    lc: hardcodedCityWeatherData.current.last_updated,
                    temp: hardcodedCityWeatherData.current.temp_c + hardcodedCityWeatherData.current.feelslike_c ,
                    windSpeed: hardcodedCityWeatherData.current.wind_kph,
                    vis: hardcodedCityWeatherData.current.vis_km,
                    isConditions: (hardcodedCityWeatherData.current.temp_c + hardcodedCityWeatherData.current.feelslike_c <= 20 ? hardcodedCityWeatherData.current.condition.text : false)
                }
            },() => console.log('Updated Parent State:', this.state));
        }
    }
    
    async forcastHandler(dataFromChild) {
        var dynamicCityWeatherData = await this.getWeatherJSON(dataFromChild);
        if(!dynamicCityWeatherData.error) { //make sure we get a proper val
            var forcastDataTmrw = dynamicCityWeatherData.forecast.forecastday[1]
            this.setState({
                astro: forcastDataTmrw.astro,
                day: forcastDataTmrw.day
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <TableCityHeader hardCodedCity={this.state.hardCodedCity} dyanmmicCodedCity={this.state.dyanmmicCodedCity}/>
                <TableCitySelector action={this.childHandler}/>
                <table border="1">
                    <tbody>
                        <TableCityColumns/>
                        <TableCity forecast={this.forcastHandler} data={this.state.hardCodedCity}/>
                        <TableCity forecast={this.forcastHandler} data={this.state.dyanmmicCodedCity}/>
                    </tbody>
                </table>
                <TableCityRefreshBtn action={this.childHandler}/>
                <TableCityForecast day={this.state.day} astro={this.state.astro}/>
            </React.Fragment>
        )
    }
}