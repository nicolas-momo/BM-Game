import React from "react";
import PropTypes from "prop-types"
import PaladinImage from "../../Images/Paladin.png"

export class Paladin extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed, exp } = statSheet;
      return (
          <>
            <h2>Exp: {exp},</h2>
            <h3>Health: {hp},</h3>
            <h3>Strength: {stat},</h3>
            <h3>Mana: {mp},</h3>
            <h3>Damage: {dmg},</h3>
            <h3>Speed: {speed},</h3>
            <img src={PaladinImage} alt="Paladin"></img>
          </>
    );
  }
}

Paladin.propTypes = {
  statSheet: PropTypes.object.isRequired,
}