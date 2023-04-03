import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,  
    teamStat: [
      {
        id: 0,
        classe: 'Warrior',
        hp: 150,
        stat: 5,
        mp: 0,
        dmg: 2,
        speed: 10,
        exp: 0,
        counter: 0,
        weight: 3,
        maxHp: 150,
        maxMp: 0,
        lvl: 1,
        skills: [],
      },
      {
        id: 1,
        classe: 'Mage',
        hp: 100,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 7,
        exp: 0,
        counter: 0,
        weight: 2,
        maxHp: 100,
        maxMp: 50,
        lvl: 1,
        skills: [],
      },
      {
        id: 2,
        classe: 'Paladin',
        hp: 200,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 5,
        exp: 0,
        counter: 0,
        weight: 4,
        maxHp: 200,
        maxMp: 50,
        lvl: 1,
        skills: [],
      },
    ],
    enemyStat: [
      { id: 0, hp: 100, classe: 'enemy', stat: 10, mp: 0, dmg: 10, speed: 5, },
      { id: 1, hp: 10, classe: 'enemy', stat: 1, mp: 0, dmg: 1, speed: 50, },   
      { id: 2, hp: 40, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 5, },
      { id: 3, hp: 20, classe: 'enemy', stat: 20, mp: 0, dmg: 20, speed: 2, },
      { id: 4, hp: 30, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 5, },
      { id: 5, hp: 55, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 7, }, 
      { id: 6, hp: 75, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 3, },  
      { id: 7, hp: 35, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 11, },
      { id: 8, hp: 60, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 13, },       
   ],
   baseChars: [
    {
      classe: 'Warrior',
      hp: 150,
      stat: 5,
      mp: 0,
      dmg: 2,
      speed: 10,
      exp: 0,
      counter: 0,
      weight: 3,
      maxHp: 150,
      maxMp: 0,
      lvl: 1,
    },
    {
      classe: 'Mage',
      hp: 100,
      stat: 5,
      mp: 50,
      dmg: 0,
      speed: 7,
      exp: 0,
      counter: 0,
      weight: 2,
      maxHp: 100,
      maxMp: 50,
      lvl: 1,
    },
    {
      classe: 'Paladin',
      hp: 200,
      stat: 5,
      mp: 50,
      dmg: 0,
      speed: 5,
      exp: 0,
      counter: 0,
      weight: 4,
      maxHp: 200,
      maxMp: 50,
      lvl: 1,
    },
  ],
  };

  componentDidMount() {
    this.createAllies();
    this.createEnemy();
  }

  createAllies = () => {
    const { teamStat, baseChars } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const charList = JSON.parse(localStorage.getItem('charList'));
    const baseList = JSON.parse(localStorage.getItem('charList'));
    if (!charList) { localStorage.setItem('charList', JSON.stringify([])); }
    if (!baseList) { localStorage.setItem('baseList', JSON.stringify(baseChars)); }
    if (allyTeam) {
      this.setState({ teamStat: allyTeam })
    } else {
      localStorage.setItem('teamStat', JSON.stringify(teamStat));
    } 
  }

  createEnemy = () => {
    const { enemyStat } = this.state;
    const enemyTeam = JSON.parse(localStorage.getItem('enemyStat'));
    if (enemyTeam) {
      this.setState({ enemyStat: enemyTeam })
    } else {
      localStorage.setItem('enemyStat', JSON.stringify(enemyStat));
    }
  }

  startBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goTavern = () => {
    const { history } = this.props;
    history.push('/tavern');
  }

  render() {
     const { teamStat } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
     }
     const buttons = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
      return (
        <>
          <div>
              <div style={ buttons }>
              <CustomButton onClick={ this.goTavern } label={ 'TAVERN' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              </div>
              <div style={mystyle}>
              { teamStat.map((char) => 
              <div key={char.id}>
              <GenericChar statSheet={char} />
              </div>
              )}
              </div>
          </div>
        </>
    );
  }
}

HomeMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
