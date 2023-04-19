import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeMenu } from './Components/Menus/HomeMenu';
import { BattleMenu } from './Components/Menus/BattleMenu';
import { TavernMenu } from './Components/Menus/TavernMenu';
import { CharMenu } from './Components/Menus/CharMenu';
import { ShopMenu } from './Components/Menus/ShopMenu';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
           <Route exact path="/" component={ HomeMenu } />
           <Route exact path="/battle" component={ BattleMenu } />
           <Route exact path="/tavern" component={ TavernMenu } />
           <Route exact path="/char/:id" component={ CharMenu } />
           <Route exact path="/shop" component={ ShopMenu } />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
