import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { allyData } from "../../Data";
import { ShowMoney } from "../Utility/ShowMoney";

export class HomeMenu extends React.Component {
  state = {
    startBattle: false,  
    teamStat: [],
    moneyQty: 0,
  };

  componentDidMount() {
    this.createAllies();
    this.getMoneyQty();
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

  charMenu = (id) => {
    const { history } = this.props;
    history.push(`/char/${id}`);
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  render() {
     const { teamStat, moneyQty } = this.state;
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
    //  const darkScreen = { 
    //   position: 'fixed',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'rgb(32,33,36)',
    //   zIndex: -1,
    // }
      return (
        <>
        {/* <div style={darkScreen}></div> */}
          <div>
              <div style={ buttons }>
              <CustomButton onClick={ this.goTavern } label={ 'TAVERN' } />
              <CustomButton onClick={ this.startBattle } label={ 'BATTLE!' } />
              </div>
              <div>
                <ShowMoney moneyQty={ moneyQty }/>
              </div>
              <div style={mystyle}>
              { teamStat.map((char, i) => 
              <div key={char.id}>
              <GenericChar statSheet={char} />
              <CustomButton onClick={ () => this.charMenu(teamStat[i].id) } label={ 'Char Menu' } />
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
