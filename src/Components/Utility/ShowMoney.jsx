import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CoinStack } from '../../Styles/svgs/coinStack.svg'
import { shrinkNum } from '../../HelperFuncs';

export class ShowMoney extends Component {
  render() {
    const { moneyQty } = this.props;
    const shrunkMoney = shrinkNum(moneyQty)
    const moneyStyle = { 
      width:'200px',
      height:'70px',
      position: 'absolute',
      top: '0',
      left: '0',
      marginLeft: '10px',
      fontSize: '14px',
      color: '#fff291',
    }
    const iconStyle = {
      width: '50px',
      height: '50px',
      marginLeft:'8px',
      marginTop:'10px',
      marginRight:'5px'
    }
    const textStyle = {
      marginTop:'30px',
      textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
      fontFamily: 'Roboto Mono, monospace'
    }
    return (
        <div style={moneyStyle}>
          <div style={{display:'flex',position:'relative', height:'100%', width: '100%', justifyContent:'space-evenly' }}>
            <CoinStack  style={iconStyle}/>
            <h1 style={textStyle}>{` ${shrunkMoney}`}</h1>
          </div>
      </div>
    )
  }
}

ShowMoney.propTypes = {
  moneyQty: PropTypes.number.isRequired,
};
