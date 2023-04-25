import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from './CustomSelect';
import '../../Styles/utils.css'

export class ShowFloor extends Component {
  render() {
    const { floor, changeFloor } = this.props;
    const options = [];
    for (let i = 0; i < floor; i+= 1) {
      options.push(`Floor ${floor - i}`);
    }
    return (
      <div className='floorWrapper'>
        <CustomSelect options={options} changeFloor={changeFloor} />
      </div>
    )
  }
}

ShowFloor.propTypes = {
  floor: PropTypes.number,
  changeFloor: PropTypes.func,
}.isRequired
