import React from "react";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";
import {ReactComponent as WizHat} from '../../Styles/svgs/wizardHat.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class Mage extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, mp, maxMp, dmg, speed, exp, lvl, name } = statSheet;
    const mystyle = {
      position:'relative',
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
      width:'100%',
      position:'absolute',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      marginTop: '-7%',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
    const nameStyle = {
      marginTop:'3%',
      fontSize:'25px',
      textAlign: 'center',
      width:'60%',
      height:'150%',
      position: 'relative',
      justifyContent:'start',
      overflowWrap: 'break-word',
      marginBottom:'10%',
      color: 'black',
      display: 'inline-block'
    }
    return (
      <div style={ mystyle }>
        <div style={ { display: 'flex', width:'100%', justifyContent:'center', position: 'relative'} }>
            <div style={ { position:'absolute', width:'100%',display: 'flex', flexDirection:'column', margin:'3%', textAlign: 'left', marginLeft:'6%', }}>
              <h3 style={ { color: 'black', marginLeft:'5px', margin:'2px',} }>LVL: { lvl }</h3>
              <h3 style={ { marginLeft:'5px', margin:'2px', color: '#1b8700',} }>Exp: { exp }</h3>
            </div> 
            <h2 style={ nameStyle }>{ name }</h2>
        </div>
        <div style={ { position:'absolute', left: '30%', top:'18.5%'} }>
          <WizHat style={{width:'132px'}}/>
        </div>
        <div style={{ position:'absolute', marginBottom:'-10%', width:'100%', top: '55%'}}>
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' } color={ '#03f7ff' } />
        </div>
        <div style={gridStyle}>
          <div style={{ position:'relative', }}>
          <div style={iconStyle}>
            <FontAwesomeIcon icon="wand-sparkles" size="2xl" style={{color: '#9b00a6'}} />
          </div>
          <h3 style={ { color: '#9b00a6', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ stat }</h3>
          </div>
          <div style={{ position:'relative' }}>
            <div style={iconStyle}>
              <FontAwesomeIcon icon="meteor" flip="horizontal" size="2xl" style={{color: "#5a48ff"}} />
            </div>
            <h3 style={ { color: '#5a48ff', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ dmg }</h3>
          </div>
          <div style={{ position:'relative' }}>
            <div style={iconStyle}>
              <FontAwesomeIcon icon="running" size="2xl" style={{color: "#baff29", height:'35px'}} />
            </div>
            <h3 style={ { color: '#baff29', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ speed }</h3>
          </div>
        </div>
      </div>
    );
  }
}

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
}