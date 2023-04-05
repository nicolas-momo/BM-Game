import React from "react";
import PropTypes from "prop-types";
import mageImage from "../../Images/mage.png";

export class Mage extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, mp, dmg, speed, exp, lvl } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
      display: 'contents',
      padding: '5px',
      margin:'2px',
     }
      return (
          <div style={mystyle}>
            <div>
              <h3 style={ { color: '#1b8700' } }>Exp: {exp}</h3>
              <h3 style={ { color: 'black' } }>Level: {lvl}</h3>
              <h3 style={ { color: 'red' } }>Health: {hp}</h3>
              <h3 style={ { color: '#9b00a6' } }>Intelligence: {stat}</h3>
              <h3 style={ { color: '#03f7ff' } }>Mana: {mp}</h3>
              <h3 style={ { color: '#000ea6' } }>Magic: {dmg}</h3>
              <h3 style={ { color: '#fad905' } }>Speed: {speed}</h3>
            </div>
            <img src={mageImage} alt="Mage"></img>
          </div>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}