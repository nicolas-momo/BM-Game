import React from "react";
import PropTypes from "prop-types"
import PaladinImage from "../../Images/paladin.png";
import { GenericBar } from "../Utility/GenericBar";

export class Paladin extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, mp, maxMp, dmg, speed, exp, lvl, name } = statSheet;
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
              <div style={{border:'solid'}}>
                <GenericBar propValue={hp/maxHp * 100} propName={ 'HP' } color={'red'}/>
              </div>
              <div style={{border:'solid'}}>
                <GenericBar propValue={ mp/maxMp * 100 } propName={ 'Mana' } color={'#03f7ff'}/>
              </div>
              <h3 style={ { color: '#9b00a6' } }>Faith: {stat}</h3>
              <h3 style={ { color: '#000ea6' } }>Damage: {dmg}</h3>
              <h3 style={ { color: '#fad905' } }>Speed: {speed}</h3>
            </div>
            <img  style={{margin: "10px", width: '100px', height: '200px'}} src={PaladinImage} alt="Paladin"></img>
          </div>
    );
  }
}

Paladin.propTypes = {
  statSheet: PropTypes.object.isRequired,
}