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
        position: 0,
        classe: 'Warrior',
        hp: 200,
        stat: 7,
        mp: 0,
        dmg: 5,
        speed: 5,
        exp: 0,
        counter: 0,
      },
      {
        id: 1,
        position: 1,
        classe: 'Mage',
        hp: 50,
        stat: 10,
        mp: 35,
        dmg: 10,
        speed: 7,
        exp: 0,
        counter: 0,
      }
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

