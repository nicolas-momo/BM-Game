import React from "react";
import PropTypes from "prop-types"
import warriorImage from "../../Images/warrior.png"

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, stat, dmg, speed, exp, lvl, name, mp } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
      display: 'contents',
      padding: '5px',
      margin:'2px',
     }
      return (
          <div style={mystyle}>
            <div>
              <h2 style={ { color: 'black' } }> {name}</h2>
              <h3 style={ { color: '#1b8700' } }>Exp: {exp}</h3>
              <h3 style={ { color: 'black' } }>Level: {lvl}</h3>
              <h3 style={ { color: 'red' } }>Health: {hp}</h3>
              <h3 style={ { color: '#9b00a6' } }>Strength: {stat}</h3>
              <h3 style={ { color: 'red' } }>Rage: {mp}</h3>
              <h3 style={ { color: '#000ea6' } }>Attack: {dmg}</h3>
              <h3 style={ { color: '#fad905' } }>Speed: {speed}</h3>
            </div>
            <img style={{margin: "10px", width: '100px', height: '200px'}} src={warriorImage} alt="Warrior"></img>
          </div>
    );
  }
}

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}