import React from "react";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class Mage extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, mp, maxMp, dmg, speed, exp, lvl, name } = statSheet;
    const mystyle = {
      height: '22rem',
      width: '25rem',
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      backgroundColor: '#c2c2c2',
      textAlign: 'center',
      margin: '5%',
    }
    const iconStyle = {
      stroke:'black',
      strokeWidth: '20',
    }
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      marginTop: '-3%'
    }

    return (
      <div style={ mystyle }>
        <div style={ { display: 'flex', textAlign: 'center', } }>
          <div style={ { display: 'flex', flexDirection:'column', position: 'relative', top:'0', left: '2%', margin:'5px' }}>
            <h3 style={ { color: 'black', marginLeft:'5px', margin:'2px', display: 'inline-block' } }>Level: { lvl }</h3>
            <h3 style={ { marginLeft:'5px', margin:'2px', color: '#1b8700', display: 'inline-block'} }>Exp: { exp }</h3>
          </div> 
          <h2 style={ { position: 'relative', left:'13%', bottom: '15%', top:'15%', marginBottom:'10%', color: 'black', display: 'inline-block' } }>{ name }</h2>
        </div>
        <div style={ { position:'relative', marginTop: '-15%', justifyContent: 'center', fontSize:'50px' } }>
          <div style={iconStyle}>
            <FontAwesomeIcon icon="hat-wizard" style={{color: "#5465ff", margin: '10%'}} size="2xl"/>
          </div>
          {/* <img style={ { margin: "10%", width: '20%', height: '40%', display: 'inline-block', } } src={ mageImage } alt="Mage"></img> */}
        </div>
        <div style={{ position:'relative'}}>
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' } color={ '#03f7ff' } />
        </div>
          {/* style={ { marginTop: '-15%' } } */}
        <div style={gridStyle}>
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
              <FontAwesomeIcon icon="running" size="2xl" style={{color: "#baff29",}} />
            </div>
            <h3 style={ { color: '#baff29', margin: '5%', display: 'inline-block'  } }>{ speed }</h3>
          </div>
        </div>
      </div>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}