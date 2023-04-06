import React from "react";
import PropTypes from "prop-types"
import warriorImage from "../../Images/warrior.png";
import { GenericBar } from "../Utility/GenericBar";

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, dmg, speed, exp, lvl, name, mp,maxMp } = statSheet;
    const mystyle = {
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      width: '25rem',
    }
      return (
          <div style={ mystyle }>
            <h2 style={ { color: 'black', textAlign: 'center', } }> { name }</h2>
            <div style={ { marginLeft: '5%', width: '90%', marginTop: '-8%', } }>
              <h3 style={ { color: '#1b8700', margin: '10%', display: 'inline-block', width: '30%', } }>Exp: { exp }</h3>
              <h3 style={ { color: 'black', margin: '10%', display: 'inline-block', width: '30%', } }>Level: { lvl }</h3>
            </div>
            <div style={ {border:'solid'} }>
              <GenericBar value={hp/maxHp * 100} color={ 'red' }/>
            </div>
            <h3 style={ { color: '#9b00a6' } }>Strength: { stat }</h3>
            <div style={ { border:'solid' } }>
              <GenericBar value={ mp/maxMp * 100 } color={ '#cc3000' }/>
            </div>
            <h3 style={ { color: 'red' } }>Rage: { mp }</h3>
            <h3 style={ { color: '#000ea6' } }>Attack: { dmg }</h3>
            <h3 style={ { color: '#fad905' } }>Speed: { speed }</h3>
          <img style={ { margin: "10px", width: '100px', height: '200px' } } src={ warriorImage } alt="Warrior"></img>
          </div>
    );
  }
}

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}