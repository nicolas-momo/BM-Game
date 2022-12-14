import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class CharMenu extends React.Component {
  state = {
    teamStat: [],
  };

  componentDidMount() {
    this.createAllies();
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
  }

  startBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }
  
  spendExp = (i) => {
    const { teamStat } = this.state;
    const char = teamStat[i]; 
    // lvl 1 -> 2 = 100
    // lvl 2 -> 3 = 100 + 100 - 0 + 100
    // lvl 3 -> 4 = 300 + 300 - 100 + 100
    const currXP = char.exp;
    console.log(currXP);
  }

  render() {
     const { match: { params: { id } } } = this.props;
     const myStyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
     const buttons = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
     }
     const teamStat = JSON.parse(localStorage.getItem('teamStat'));
      return (
        <>
          <div> 
            <div style={ buttons }>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
            </div>
            <div style={myStyle}>
            { teamStat.map((char) => {
              if(char.id == id) {
                return <div key={ char.id }>
                <CustomButton name={ char.id } onClick={ () => this.spendExp(id) } label={ 'SPEND EXP' } />
                <div onClick={ () => this.addChar(char) } >
                <GenericChar statSheet={ char } />
                </div>   
              </div>            
            }})}
            </div>
          </div>
        </>
    );
  }
}

CharMenu.propTypes = {
  history: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }),
}.isRequired;
