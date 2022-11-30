import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class Tavern extends React.Component {
  state = {
    teamStat: [],
  };

  componentDidMount() {
    this.createAllies();
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({teamStat: allyTeam});
  }

  startBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
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
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
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

Tavern.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

