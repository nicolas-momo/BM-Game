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
      width: '500px',
      height: '200px',
      border: '1px solid black',
      padding: '10px',
      margin: '10px',
      backgroundColor: '#F5A2B2',
      fontFamily: 'Roboto Mono, monospace',
      textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
      color: 'white' ,
      fontSize: '16px',
      borderRadius: '5px',
      textAlign:'center',
      position:'relative',
      userSelect: 'none',
     }
     const okButton = {
      fontFamily: 'Roboto Mono, monospace',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      fontSize: '24px',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '80px',
      position: 'absolute',
      bottom: '2%',
      left: '22%',
      padding: '8px',
      cursor: 'pointer',
      color: 'black',
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
