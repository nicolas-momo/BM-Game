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
      },
    ],
  };

  componentDidMount() {
    this.createAllies();
  }

  createAllies = () => {
    const { teamStat } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const charList = JSON.parse(localStorage.getItem('charList'));
    if (!charList) { localStorage.setItem('charList', JSON.stringify([])); }
    if (allyTeam) {
      this.setState({teamStat: allyTeam})
    } else {
      localStorage.setItem('teamStat', JSON.stringify(teamStat));
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
      return (
        <>
          <div>
              <CustomButton onClick={ this.goTavern } label={ 'TAVERN' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
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

