import React from "react";
import randImage from "../Images/rand.png"
import PropTypes from "prop-types"

export class RandEnemy extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hpE, statE, mpE, dmgE} = statSheet;
      return (
          <>
            <h3>Health: {hpE},</h3>
            <h3>Stat: {statE},</h3>
            <h3>Mana: {mpE},</h3>
            <h3>Damage: {dmgE},</h3>
            <img src={randImage} alt="RandEnemy"></img>
          </>
    );
  }
}

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}