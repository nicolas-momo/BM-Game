import './App.css';
import React, { Component } from 'react';
import { HomeMenu } from './Components/Menus/HomeMenu';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeMenu />
      </div>
    );
  }
}
export default App;