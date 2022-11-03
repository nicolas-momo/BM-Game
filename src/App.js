import './App.css';
import React, { Component } from 'react';
import { Warrior } from './Components/Warrior';
import { Mage } from './Components/Mage';
import { RandEnemy } from './Components/RandEnemy';
import { BattleMenu } from './Components/BattleMenu';

class App extends Component {
  state = {
    enemyStat: {
      hpE: 50,
      classe: 'enemy',
      statE: 10,
      mpE: 0,
      dmgE: 5,
      speedE: 10,
    },
    startBattle: false,
    teamStat: [{
      id: 1,
      classe: 'warrior',
      hp: 100,
      stat: 7,
      mp: 0,
      dmg: 5,
      speed: 10,
    },
    {
    id: 2,
    classe: 'Mage',
    hp: 50,
    stat: 10,
    mp: 35,
    dmg: 10,
    speed: 10,
  }],    
  };
  
  render() {
    const { enemyStat, startBattle, teamStat } = this.state;
    return (
      <div className="App">
        <Warrior statSheet={ enemyStat }/>
        <Mage statSheet={ enemyStat }/>
        <RandEnemy statSheet={ enemyStat }/>
        <button type="button" onClick={ () => this.setState({startBattle: !startBattle }) }> BATTLE! </button>
        {startBattle && <BattleMenu teamStat={ teamStat } enemyStat={ enemyStat }/>}
      </div>
    );
  }
}
export default App;