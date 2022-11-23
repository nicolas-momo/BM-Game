import React from "react";
import { CustomButton } from "../Utility/CustomButton";
import { BattleMenu } from "./BattleMenu";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,
    enemyStat: [
      {
      hp: 50,
      classe: 'enemy',
      stat: 10,
      mp: 0,
      dmg: 5,
      speed: 10,
    },
      {
      hp: 55,
      classe: 'enemy',
      stat: 10,
      mp: 0,
      dmg: 5,
      speed: 15,
    }
   ],
    teamStat: [
      {
        id: 1,
        classe: 'Warrior',
        hp: 100,
        stat: 7,
        mp: 0,
        dmg: 5,
        speed: 12,
      },
      {
        id: 2,
        classe: 'Mage',
        hp: 50,
        stat: 10,
        mp: 35,
        dmg: 10,
        speed: 7,
      }
    ],    
  };
  render() {
    const { startBattle, teamStat, enemyStat } = this.state;
      return (
          <>
            <div>
              <CustomButton onClick={ () => alert('Teste0') } label={ 'Teste0' } />
              <CustomButton onClick={ () => this.setState({startBattle: !startBattle }) } label={ 'BATTLE!' } />
              {startBattle && <BattleMenu enemyStat={ enemyStat } teamStat={ teamStat } />}
            </div>
          </>
    );
  }
}