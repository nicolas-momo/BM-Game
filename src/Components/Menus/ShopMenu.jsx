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
    const itemSold = shopItems.find(el => el.id === item.id)
    itemSold.sold = true;

    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
    this.setState({ shopItems: shopItems });
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
  goBattle = () => {
    const { history } = this.props;
    history.push('/battle');
  }

  render() {
     const { moneyQty, shopItems } = this.state;
     const mystyle = {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
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
              <CustomButton onClick={this.goHome} label={ 'Home' }/>
              <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
              <CustomButton isDisabled={ true } label={ 'Shop' } />
              <CustomButton onClick={ this.goBattle } label={ 'Battle!' } />
            </div>
              <div>
                <ShowMoney moneyQty={ moneyQty }/>
              </div>
              <div style={mystyle}>
              <div style={{display: 'flex', flexWrap:'wrap', marginLeft: '50px'}}>
                {shopItems.map((item) => 
                <div onClick={ () => this.buyItem(item) } key={item.name} style={{ flex: '0 0 15%' }}>
                  <ItemCard name={item.name} description={item.description} cost={item.cost} sold={ item.sold }/>
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
