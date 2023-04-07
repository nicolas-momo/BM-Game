import React from "react";
import PropTypes from "prop-types"
import warriorImage from "../../Images/warrior.png";
import { GenericBar } from "../Utility/GenericBar";

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, dmg, speed, exp, lvl, name, mp, maxMp } = statSheet;
    const mystyle = {
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      width: '25rem',
      backgroundColor: '#c2c2c2',
      textAlign: 'center',
      margin: '5%',
    }
      return (
          <div style={ mystyle }>
            <h2 style={ { color: 'black', textAlign: 'center', } }> { name }</h2>
            <div style={ { marginTop: '-10%', } }>
              <h3 style={ { color: '#1b8700', margin: '10%', display: 'inline-block', width: '30%', } }>Exp: { exp }</h3>
              <h3 style={ { color: 'black', margin: '10%', display: 'inline-block', width: '30%', } }>Level: { lvl }</h3>
            </div>
            <div style={ { marginTop: '-15%', } }>
              <img style={ { margin: "10%", width: '20%', height: '40%', display: 'inline-block', } } src={ warriorImage } alt="Warrior"></img>
            </div>
            <div style={ { border:'solid', margin: '8.5%', marginTop: '-5%', } }>
              <GenericBar propValue={hp/maxHp * 100} propName={ 'HP' } color={ 'red' }/>
            </div>
            <div style={ { border:'solid', margin: '8.5%', marginTop: '-3%', } }>
              <GenericBar propValue={ mp/maxMp * 100 } propName={ 'Rage' } color={ '#cc3000' } />
            </div>
            <div style={ { marginTop: '-15%', } }>
              <h3 style={ { color: '#9b00a6', margin: '10%', display: 'inline-block', width: '30%', } }>Strength: { stat }</h3>
              <h3 style={ { color: '#000ea6', margin: '10%', display: 'inline-block', width: '30%', } }>Attack: { dmg }</h3>
            </div>
            <h3 style={ { color: '#fad905', marginTop: '-8%', } }>Speed: { speed }</h3>
          </div>
    );
  }
}

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}