import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/utils.css'
import { CustomSelect } from './CustomSelect';

export class ShowFloor extends Component {
  state = {
    isDragging: false,
  }

  render() {
    const { floor, changeFloor } = this.props;
    const floorStyle = { 
      width:'200px',
      height:'70px',
      position: 'absolute',
      top: '0',
      right: '0',
      marginRight: '10px',
      fontSize: '14px',
      color: 'white',
      userSelect: 'none',
      display:'flex',
    }
    const options = [];
    for (let i = 0; i < floor; i+= 1) {
      options.push(`Floor ${floor - i}`);
    }
    return (
      <div style={floorStyle}>
        <CustomSelect options={options} changeFloor={changeFloor} />
      </div>
    )
  }
}

ShowFloor.propTypes = {
  floor: PropTypes.number,
  changeFloor: PropTypes.func,
}.isRequired
