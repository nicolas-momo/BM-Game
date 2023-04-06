import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { ShowMoney } from "../Utility/ShowMoney";

export class ShopMenu extends React.Component {
  state = {
    teamStat: [],
    moneyQty: 0,
  };

  componentDidMount() {
    this.createAllies();
    this.getMoneyQty();
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  goBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }
  
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  goTavern = () => {
    const { history } = this.props;
    history.push('/tavern');
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
      return (
        <>
          <div>
              <div style={ buttons }>
              <CustomButton onClick={ this.goHome } label={ 'Home' } />
              <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
              <CustomButton onClick={ this.goBattle } label={ 'BATTLE!' } />
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

ShopMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
