import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeMenu } from './Components/Menus/HomeMenu';
import { BattleMenu } from './Components/Menus/BattleMenu';
import { Teste } from './Components/Menus/teste';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
           <Route exact path="/" component={ HomeMenu } />
           <Route exact path="/battle" component={ BattleMenu } />
           <Route exact path="/teste" component={ Teste } />
        </Switch>    
      </BrowserRouter>
    );
  }
}
export default App;