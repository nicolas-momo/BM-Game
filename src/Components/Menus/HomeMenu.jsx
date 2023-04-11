import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { allyData } from "../../Data";
import { ShowMoney } from "../Utility/ShowMoney";

export class HomeMenu extends React.Component {
  state = {
    goBattle: false,  
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

  goBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  goTavern = () => {
    const { history } = this.props;
    history.push('/tavern');
  }

  goShop = () => {
    const { history } = this.props;
    history.push('/shop');
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  render() {
     const { teamStat, moneyQty } = this.state;
     const { history } = this.props;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
     }
     const buttons = {
      width:'100vw',
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor:'#393D3F',
     }
      return (
        <>
          <div>
              <div style={ buttons }>
              <CustomButton isDisabled={true} label={ 'Home' }/>
              <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
              <CustomButton onClick={ this.goShop } label={ 'Shop' } />
              <CustomButton onClick={ this.goBattle } label={ 'Battle!' } />
              </div>
              <div>
                <ShowMoney moneyQty={ moneyQty }/>
              </div>
              <div style={mystyle}>
              { teamStat.map((char) => 
              <div key={char.id}>
              <GenericChar statSheet={char} history={ history }/>
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
