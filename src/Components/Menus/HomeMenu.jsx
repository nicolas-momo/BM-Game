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
        hp: 100,
        stat: 5,
        mp: 0,
        dmg: 2,
        speed: 10,
        exp: 0,
        counter: 0,
        weight: 4,
        maxHp: 150,
        maxMp: 0,
      },
      {
        id: 1,
        classe: 'Mage',
        hp: 75,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 7,
        exp: 0,
        counter: 0,
        weight: 2,
        maxHp: 75,
        maxMp: 50,
      },
      {
        id: 2,
        classe: 'Paladin',
        hp: 2000,
        stat: 5,
        mp: 50,
        dmg: 0,
        speed: 5,
        exp: 0,
        counter: 0,
        weight: 6,
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

  render() {
     const { teamStat } = this.state;
      return (
        <>
          <div>
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              { teamStat.map((char) => 
              <div key={char.id}>
              <GenericChar statSheet={char} />
              </div>
              )}
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

