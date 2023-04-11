import React from "react";
import PropTypes from "prop-types"
import { GenericBar } from "../Utility/GenericBar";
import {ReactComponent as WarriorHelmet} from '../../Styles/svgs/warriorHelmet.svg'
import {ReactComponent as Sword} from '../../Styles/svgs/swordSvg.svg'
import {ReactComponent as Strength} from '../../Styles/svgs/dumbbells.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Warrior extends React.Component {
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, dmg, speed, exp, lvl, name, mp, maxMp } = statSheet;
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
          <div style={ { position:'absolute', left: '30%', top:'17%'} }>
            <WarriorHelmet style={{margin: '5%', width: '132px', marginBottom: '3%'}}/>
          </div>
          <div style={{ position:'absolute', marginBottom:'-10%', width:'100%', top: '55%'}}>
            <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
            <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'Rage' } color={ '#cc3000' } />
          </div>
          <div style={gridStyle}>
          <div style={{ position:'relative' }}>
            <div>
              <Strength style={{ width: '45px', marginTop: '-4px', marginBottom:'-10px', }}/>
            </div>
            <h3 style={ { color: 'black', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ stat }</h3>
          </div>
          <div style={{ position:'relative' }}>
            <div>
              <Sword style={{width: '37px', marginTop: '-2px', marginBottom:'-4px', }}/>
            </div>
            <h3 style={ { color: 'black', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ dmg }</h3>
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

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
}