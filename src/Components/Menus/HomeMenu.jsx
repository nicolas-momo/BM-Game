import React from "react";
import { CustomButton } from "../Utility/CustomButton";
import { BattleMenu } from "./BattleMenu";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,
    enemyStat: {
      hpE: 50,
      classe: 'enemy',
      statE: 10,
      mpE: 0,
      dmgE: 5,
      speedE: 10,
    },
    teamStat: [
      {
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
      }
    ],    
  };
  render() {
    const { startBattle, teamStat, enemyStat } = this.state;
      return (
          <>
            <div>
              <CustomButton onClick={ () => alert('Teste0') } label={ 'Teste0' } />
              <CustomButton onClick={ () => alert('Teste1') } label={ 'Teste1' } />
              <CustomButton onClick={ () => alert('Teste2') } label={ 'Teste2' } />
              <CustomButton onClick={ () => alert('Teste3') } label={ 'Teste3' } />
              <CustomButton onClick={ () => alert('Teste4') } label={ 'Teste4' } />
              <CustomButton onClick={ () => this.setState({startBattle: !startBattle }) } label={ 'BATTLE!' } />
              {startBattle && <BattleMenu enemyStat={ enemyStat } teamStat={ teamStat } />}
            </div>
          </>
    );
  }
}