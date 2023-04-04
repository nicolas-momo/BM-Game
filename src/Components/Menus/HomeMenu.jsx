import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { allyData } from "../../CharData";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,  
    teamStat: [],
  };

  componentDidMount() {
    this.createAllies();
  }

  createAllies = () => {
    const { baseChars, baseTeam } = allyData
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const charList = JSON.parse(localStorage.getItem('charList'));
    const baseList = JSON.parse(localStorage.getItem('baseList'));
    if (!charList) { localStorage.setItem('charList', JSON.stringify([])); }
    if (!baseList) { localStorage.setItem('baseList', JSON.stringify(baseChars)); }
    if (allyTeam) {
      this.setState({ teamStat: allyTeam })
    } else {
      this.setState({ teamStat: baseTeam })
      localStorage.setItem('teamStat', JSON.stringify(baseTeam));
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
