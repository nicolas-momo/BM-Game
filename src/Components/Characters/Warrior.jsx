import React from "react";
import PropTypes from "prop-types"
import warriorImage from "../../Images/warrior.png"

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, dmg, speed, exp, lvl } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
     }
      return (
          <>
           <div style={mystyle}>
            <h3>Exp: {exp}</h3>
            <h3>Level: {lvl}</h3>
            <h3>Health: {hp}</h3>
            <h3>Strength: {stat}</h3>
            <h3>Attack: {dmg}</h3>
            <h3>Speed: {speed}</h3>
           </div>
            <img src={warriorImage} alt="Warrior"></img>
          </>
    );
  }
}

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}