import React from "react";
import PropTypes from "prop-types"
import mageImage from "../../Images/mage.png"

export class Mage extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed, exp } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
     }
      return (
          <>
           <div style={mystyle}>
            <h3>Exp: {exp}</h3>
            <h3>Health: {hp}</h3>
            <h3>Intelligence: {stat}</h3>
            <h3>Mana: {mp}</h3>
            <h3>Magic: {dmg}</h3>
            <h3>Speed: {speed}</h3>
           </div>
            <img src={mageImage} alt="Mage"></img>
          </>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}