import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/utils.css'

export class MaxFloor extends Component {
  state = {
    maxFloor: 1
  }

  componentDidMount() {
    const maxFloor = JSON.parse(localStorage.getItem('maxFloor')) || 1;
    this.setState({ maxFloor })
  }
  
  render() {
    const { maxFloor } = this.state;
    const { currentFloor } = this.props;
    return (
      <div className='floorWrapper'>
        <div className='showMaxFloor'>
          {currentFloor ? `Floor ${currentFloor}` : `Floor ${maxFloor}`}
        </div>
      </div>
    )
  }
}

MaxFloor.propTypes = {
  currentFloor: PropTypes.number
};
