import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeMenu } from './Components/Menus/HomeMenu';
import { BattleMenu } from './Components/Menus/BattleMenu';
import { Tavern } from './Components/Menus/Tavern';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
           <Route exact path="/" component={ HomeMenu } />
           <Route exact path="/battle" component={ BattleMenu } />
           <Route exact path="/tavern" component={ Tavern } />
        </Switch>    
      </BrowserRouter>
    );
  }
}
export default App;