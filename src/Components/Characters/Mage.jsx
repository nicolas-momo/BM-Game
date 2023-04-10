import React from "react";
import PropTypes from "prop-types";
// import mageImage from "../../Images/mage.png";
import { GenericBar } from "../Utility/GenericBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class Mage extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, mp, maxMp, dmg, speed, exp, lvl, name } = statSheet;
    const mystyle = {
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      width: '25rem',
      backgroundColor: '#c2c2c2',
      textAlign: 'center',
      margin: '5%',
    }
    const iconStyle = {
      stroke:'black',
      strokeWidth: '20',
    };
      return (
          <div style={ mystyle }>
            <h2 style={ { color: 'black', textAlign: 'center', } }> { name }</h2>
            <div style={ { marginTop: '-10%', } }>
              <h3 style={ { color: '#1b8700', margin: '10%', display: 'inline-block', width: '30%', } }>Exp: { exp }</h3>
              <h3 style={ { color: 'black', margin: '10%', display: 'inline-block', width: '30%', } }>Level: { lvl }</h3>
            </div>
            <div style={ { marginTop: '-15%', justifyContent: 'center', fontSize:'50px' } }>
              <div style={iconStyle}>
                <FontAwesomeIcon icon="hat-wizard" style={{color: "#5a48ff", margin: '10%'}} size="2xl"/>
              </div>
              {/* <img style={ { margin: "10%", width: '20%', height: '40%', display: 'inline-block', } } src={ mageImage } alt="Mage"></img> */}
            </div>
              <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
              <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' } color={ '#03f7ff' } />
              {/* style={ { marginTop: '-15%' } } */}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div style={{ position:'relative' }}>
                <div style={iconStyle}>
                  <FontAwesomeIcon icon="wand-sparkles" size="2xl" style={{color: '#9b00a6'}} />
                </div>
                <h3 style={ { color: '#9b00a6', margin: '5%', display: 'inline-block' } }>{ stat }</h3>
              </div>
              <div style={{ position:'relative' }}>
                <div style={iconStyle}>
                  <FontAwesomeIcon icon="meteor" flip="horizontal" size="2xl" style={{color: "#5a48ff"}} />
                </div>
                <h3 style={ { color: '#000ea6', margin: '5%', display: 'inline-block' } }>{ dmg }</h3>
              </div>
              <div style={{ position:'relative' }}>
                <div style={iconStyle}>
                  <FontAwesomeIcon icon="running" size="2xl" style={{color: "yellow",}} />
                </div>
                <h3 style={ { color: 'yellow', margin: '5%', display: 'inline-block'  } }>{ speed }</h3>
              </div>
            </div>
          </div>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}