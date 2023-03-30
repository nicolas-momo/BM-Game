import React from "react";
import PropTypes from "prop-types"
import PaladinImage from "../../Images/paladin.png"

export class Paladin extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed, exp, lvl } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
     }
      return (
          <>
           <div style={mystyle}>
            <h3 style={ { color: '#1b8700' } }>Exp: {exp}</h3>
            <h3 style={ { color: 'black' } }>Level: {lvl}</h3>
            <h3 style={ { color: 'red' } }>Health: {hp}</h3>
            <h3 style={ { color: '#9b00a6' } }>Strength: {stat}</h3>
            <h3 style={ { color: '#03f7ff' } }>Mana: {mp}</h3>
            <h3 style={ { color: '#000ea6' } }>Damage: {dmg}</h3>
            <h3 style={ { color: '#fad905' } }>Speed: {speed}</h3>
           </div>
            <img src={PaladinImage} alt="Paladin"></img>
          </>
    );
  }
}

Paladin.propTypes = {
  statSheet: PropTypes.object.isRequired,
}