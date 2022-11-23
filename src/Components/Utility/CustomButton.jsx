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
    let { hover } = this.state;
    const { onClick, label } = this.props;
    
    let bgColor = hover ? '#642ed1' : '#470a59';
    let buttonStyle = {
      backgroundColor: bgColor,
      color: 'white',
      fontSize: '20px',
      padding: '10px 60px',
      margin: '10px 0px',
      cursor: 'pointer',
    }
      return (
          <>
            <button style={ buttonStyle } type="button" onClick={onClick} onMouseOver={ this.mouseIsOver } onMouseOut={ this.mouseIsOut }>
              {label}
            </button>
          </>
    );
  }
}

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}