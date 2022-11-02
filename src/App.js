import './App.css';
import React, { Component } from 'react';
import { Warrior } from './Components/Warrior';
import { Mage } from './Components/Mage';
import { RandEnemy } from './Components/RandEnemy';

class App extends Component {
  state = {
    enemyStat: {
      hp: 50,
      stat: 10,
      mp: 0,
      dmg: 1,
    }
  };
  
  render() {
    const { enemyStat } = this.state;
    return (
      <div className="App">
        <Warrior hp={200} str={60} mp={100} dmg={10}/>
        <Mage hp={200} int={60} mp={100} dmg={5}/>
        <RandEnemy statSheet={ enemyStat } />
        <button type="button" onClick={ () => this.setState({
      enemyStat: {
      hp: 100,
      stat: 20,
      mp: 0,
      dmg: 1,
      }})}>
      </button>
      </div>
    );
  }
}
export default App;