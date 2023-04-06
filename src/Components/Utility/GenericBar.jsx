import React from "react";
import PropTypes from "prop-types"

export class GenericBar extends React.Component {
  render() {
    const { value, color } = this.props;
    const barStyle = {
      backgroundColor: color,
      height: "20px",
      width: `${value}%`,
      transition: "width 0.5s ease-in-out",
    };

    return (
    <div style={barStyle}></div>
    )
  }
}

GenericBar.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};