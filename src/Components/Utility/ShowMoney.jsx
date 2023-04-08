import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ShowMoney extends Component {
  render() {
    const { moneyQty } = this.props;
    const moneyStyle = { 
      position: 'absolute',
      top: '0',
      left: '0',
      display: 'block',
      width: '15%',
      height: '5%',
      // border: '1px solid black',
      padding: '10px',
      margin: '10px',
      // backgroundColor: 'white',
      fontFamily: 'sans-serif',
      fontSize: '12px',
      borderRadius: '5px',
      color: '#fff291' ,
     }
    
    return (
        <div style={moneyStyle}>
          <h1>{`Gold: ${moneyQty}`}</h1>
      </div>
    )
  }
}

ShowMoney.propTypes = {
  moneyQty: PropTypes.number.isRequired,
};
