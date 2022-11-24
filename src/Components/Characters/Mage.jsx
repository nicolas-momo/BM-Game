import React from "react";
import mageImage from "../../Images/mage.png"
import PropTypes from "prop-types"

export class Mage extends React.Component {
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
            <img src={mageImage} alt="Mage"></img>
          </>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}