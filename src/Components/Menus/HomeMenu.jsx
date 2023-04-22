import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { allyData } from "../../Data";
import { ShowMoney } from "../Utility/ShowMoney";
import { MaxFloor } from "../Utility/MaxFloor";

export class HomeMenu extends React.Component {
  state = {
    goBattle: false,  
    teamList: [],
    moneyQty: 0,
  };

  componentDidMount() {
    this.createAllies();
    this.getMoneyQty();
  }

  createAllies = () => {
    const { baseChars, baseTeam } = allyData;
    const allyTeam = JSON.parse(localStorage.getItem('teamList'));
    const benchList = JSON.parse(localStorage.getItem('benchList'));
    const baseCharList = JSON.parse(localStorage.getItem('baseCharList'));
    const allAlliesList = JSON.parse(localStorage.getItem('allAlliesList'));
    if (!benchList) { localStorage.setItem('benchList', JSON.stringify([])); }
    if (!baseCharList) { localStorage.setItem('baseCharList', JSON.stringify(baseChars)); }
    if (!allAlliesList) { localStorage.setItem('allAlliesList', JSON.stringify(baseTeam)); }
    if (allyTeam) {
      this.setState({ teamList: allyTeam })
    } else {
      this.setState({ teamList: baseTeam })
      localStorage.setItem('teamList', JSON.stringify(baseTeam));
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
    const { teamList, moneyQty } = this.state;
    const mystyle = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    };
    return (
      <div>
          <div className='topMenuButtons'>
            <CustomButton isDisabled={true} label={ 'Home' }/>
            <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
            <CustomButton onClick={ this.goShop } label={ 'Shop' } />
            <CustomButton onClick={ this.goBattle } label={ 'Battle!' } />
          </div>
          <ShowMoney moneyQty={ moneyQty }/>
          <MaxFloor />
          <div style={mystyle}>
            { teamList.map((char) => 
            <div key={char.id}>
             <GenericChar statSheet={char}/>
            </div>
            )}
          </div>
      </div>
    );
  }
}

HomeMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
