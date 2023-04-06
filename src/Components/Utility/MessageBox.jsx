import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MessageBox extends Component {
  state = {
    showMessage: true
  }

  handleClick = () => {
    const { onHide } = this.props;
    onHide(); 
  };

  render() {
    const { message } = this.props;
    const { showMessage } = this.state;
    const messageStyle = { 
      display: 'block',
      width: '600px',
      height: '200px',
      border: '1px solid black',
      padding: '10px',
      margin: '10px',
      backgroundColor: '#fc0366',
      fontFamily: 'sans-serif',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      color:  'black' ,
     }
     const okButton = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
      width: '300px',
      backgroundColor: '#D3D3D3',
      borderRadius: '5px',
      position: 'relative',
      left:'20%',
      top: '20%',
      marginLeft: '30px', 
      padding: '8px 12px',
      cursor: 'pointer',
      color: 'black',
      transition: 'background-color 0.33s ease-in-out, color 0.23s ease-in-out',
    }
    const coverScreen = { 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
    };
    return showMessage ? (
      <div style={coverScreen}>
        <div style={messageStyle}>
          <h1>{message}</h1>
          <button style={okButton} onClick={this.handleClick}>OK</button>
        </div>
      </div>
    ) : null;
  }
}

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};
