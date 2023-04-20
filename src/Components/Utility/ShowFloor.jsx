import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../Styles/utils.css'
import CustomSelect from './CustomSelect';

export class ShowFloor extends Component {
  state = {
    isDragging: false,
  }

  selectRef = React.createRef()

  render() {
    const { floor } = this.props;
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
    }
    const options = [];
    for (let i = 1; i <= floor; i++) {
      options.push(`Floor ${floor - i}`);
    }
    return (
    <div style={floorStyle}>
      <div style={{display:'flex',position:'relative', height:'100%', width: '100%', justifyContent:'space-evenly' }}>
          <CustomSelect options={options} optionsScroll={ this.selectRef }/>
        </div>
      </div>
    )
  }
}

ShowFloor.propTypes = {
  floor: PropTypes.number.isRequired,
};
