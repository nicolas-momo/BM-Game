import React from "react";
import PropTypes from "prop-types"


export class CustomButton extends React.Component {
  state = {
    hover: false,
  }

  mouseIsOver = () => {
    this.setState({ hover: true });
  }
  mouseIsOut = () => {
    this.setState({ hover: false });
  }
  render() {
    const { hover } = this.state;
    const { onClick, label, isDisabled } = this.props;
    
    const bgColor = hover ? '#404866' : '#333';
    const buttonStyle = {
      fontFamily: 'Roboto Mono, monospace',
      borderRadius:'30px',
      backgroundColor: isDisabled ? '#e2e2e2' : bgColor,
      color: isDisabled ? 'black' : 'white',
      fontSize: '20px',
      padding: '10px',
      margin: '10px 2px',
      cursor: 'pointer',
      width: '200px',
      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))',
      borderTop: isDisabled ? '2px solid rgba(155, 155, 155, 0.3)' :'2px solid rgba(155 , 155, 155, 0.3)',
      borderLeft: isDisabled ? '2px solid rgba(155, 155, 155, 0.3)' :'2px solid rgba(155 , 155, 155, 0.3)',
      borderRight: isDisabled ? '2px solid rgba(135, 135, 135, 0.8)' : '2px solid black',
      borderBottom: isDisabled ? '2px solid rgba(135, 135, 135, 0.8)' :'2px solid black',
    }
      return (
          <>
            <button 
              style={ buttonStyle } 
              type="button" 
              onClick={onClick} 
              onMouseOver={ this.mouseIsOver } 
              onMouseOut={ this.mouseIsOut }
              disabled={ isDisabled }
              >
              {label}
            </button>
          </>
    );
  }
}

CustomButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
}

CustomButton.defaultProps = {
  isDisabled: false,
  onClick: null,
}