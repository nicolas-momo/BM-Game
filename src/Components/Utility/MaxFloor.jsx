import React, { Component } from 'react';
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
    const floorStyle = { 
      width:'200px',
      height:'50px',
      position: 'absolute',
      top: '0',
      right: '0',
      marginRight: '10px',
      fontSize: '14px',
      color: 'white',
      userSelect: 'none',
      display:'flex',
    }
  
    return (
      <div style={floorStyle}>
        <div className='showMaxFloor'>
          {`Floor ${maxFloor}`}
        </div>
      </div>
    )
  }
}
