import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { ShowMoney } from "../Utility/ShowMoney";
import { ItemCard } from "../Utility/ItemCard";
import { itemData } from "../../Data";

export class ShopMenu extends React.Component {
  state = {
    moneyQty: 0,
    shopItems: [],
  };

  componentDidMount() {
    this.getMoneyQty();
    this.getAvailableItems();
  }

  getAvailableItems = () => {
    const items = JSON.parse(localStorage.getItem('shopItems')) || itemData
    localStorage.setItem('shopItems', JSON.stringify(items));
    this.setState({ shopItems: items })
  }

  buyItem = (item) => {
    const { shopItems } = this.state;
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const updatedInventory = [...inventory, item];
    const newShop = shopItems.filter(el => el.id !== item.id)

    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    localStorage.setItem('shopItems', JSON.stringify(newShop));
    this.setState({ shopItems: newShop });
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
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
     const { moneyQty, shopItems } = this.state;
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
              </div>
              <div>
                <ShowMoney moneyQty={ moneyQty }/>
              </div>
              <div style={mystyle}>
              <div style={{display: 'flex', flexWrap:'wrap'}}>
              {shopItems.map((item) => 
              <div onClick={ () => this.buyItem(item) } key={item.name} style={{ flex: '0 0 20%' }}>
              <ItemCard name={item.name} description={item.description} cost={item.cost} />
              </div>
              )}
              </div>
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
