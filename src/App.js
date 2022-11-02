import './App.css';
import React, { Component } from 'react';
import { Warrior } from './Components/Warrior';
import { Mage } from './Components/Mage';
import { RandEnemy } from './Components/RandEnemy';
import { BattleMenu } from './Components/BattleMenu';

class App extends Component {
  state = {
    enemyStat: {
      hp: 50,
      stat: 10,
      mp: 0,
      dmg: 1,
    },
    startBattle: false,
  };
  
  render() {
    const { enemyStat, startBattle } = this.state;
    return (
      <div className="App">
        <Warrior statSheet={ enemyStat }/>
        <Mage statSheet={ enemyStat }/>
        <RandEnemy statSheet={ enemyStat }/>
        <button type="button" onClick={ () => this.setState({startBattle: !startBattle }) }> BATTLE! </button>
        {startBattle && <BattleMenu />}
      </div>
    );
  }
}
export default App;