import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';

import TableCityView from './TableCityView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TableCityView cityName="Chicago" />                
        </header>
        <p id="errorLogs"></p>
      </div>
    );
  }
}

export default App;
