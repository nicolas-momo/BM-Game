import React from "react";
import randImage from "../../Images/rand.png"
import PropTypes from "prop-types"

export class RandEnemy extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed} = statSheet;
      return (
          <>
            <h3>Health: {hp},</h3>
            <h3>Stat: {stat},</h3>
            <h3>Mana: {mp},</h3>
            <h3>Damage: {dmg},</h3>
            <h3>Speed: {speed},</h3>
            <img src={randImage} alt="RandEnemy"></img>
          </>
    );
  }
}

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}