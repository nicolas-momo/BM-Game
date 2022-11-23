import React from "react";
import warriorImage from "../Images/warrior.png"
import PropTypes from "prop-types"

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed } = statSheet;
      return (
          <>
            <h3>Health: {hp},</h3>
            <h3>Stat: {stat},</h3>
            <h3>Mana: {mp},</h3>
            <h3>Damage: {dmg},</h3>
            <h3>Speed: {speed},</h3>
            <img src={warriorImage} alt="Warrior"></img>
          </>
    );
  }
}

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}