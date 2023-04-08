import React from "react";
import PropTypes from "prop-types"

export class GenericBar extends React.Component {
  render() {
    const { color, propValue, propName } = this.props;
    const barStyle = {
      backgroundColor: color,
      height: "20px",
      width: `${propValue}%`,
      transition: "width 0.5s ease-in-out",
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    };

    return (
    <div style={barStyle}>{`${propName}: ${propValue}`}</div>
    )
  }
}

GenericBar.propTypes = {
  propValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};