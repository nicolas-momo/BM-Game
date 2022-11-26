import React from "react";
import PropTypes from "prop-types"
import warriorImage from "../../Images/warrior.png"


export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed, exp } = statSheet;
      return (
          <>
            <h2>Exp: {exp},</h2>
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