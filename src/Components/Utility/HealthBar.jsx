import React from "react";
import PropTypes from "prop-types"

export class HealthBar extends React.Component {
  render() {
    const { hp } = this.props;
    const barStyle = {
      backgroundColor: "red",
      height: "20px",
      width: `${hp}%`,
      transition: "width 0.5s ease-in-out",
    };

    return (
    <div style={barStyle}></div>
    )
  }
}

HealthBar.propTypes = {
  hp: PropTypes.number.isRequired,
};