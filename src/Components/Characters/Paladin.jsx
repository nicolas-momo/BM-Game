import React from "react";
import PropTypes from "prop-types"
// import paladinImage from "../../Images/paladin.png";
import { GenericBar } from "../Utility/GenericBar";
import {ReactComponent as PaladinShield} from '../../Styles/svgs/paladinShield.svg'
import {ReactComponent as PaladinCross} from '../../Styles/svgs/paladinCross.svg'
import {ReactComponent as PaladinHammer} from '../../Styles/svgs/paladinHammer.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Paladin extends React.Component {
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
                <h3 style={ { color: 'black', marginLeft:'5px', margin:'2px', display: 'inline-block' } }>LVL: { lvl }</h3>
                <h3 style={ { marginLeft:'5px', margin:'2px', color: '#1b8700', display: 'inline-block'} }>Exp: { exp }</h3>
              </div> 
              <h2 style={ { position: 'relative', left:'13%', bottom: '15%', top:'15%', marginBottom:'10%', color: 'black', display: 'inline-block' } }>{ name }</h2>
            </div>
            <div style={ { position:'relative', marginTop: '-15%', justifyContent: 'center'} }>
              <PaladinShield style={{margin: '5%', width: '132px'}}/>
              {/* <img style={ { margin: "10%", width: '20%', height: '40%', display: 'inline-block', } } src={ paladinImage } alt="Mage"></img> */}
            </div>
              <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
              <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' } color={ '#03f7ff' } />
            <div style={gridStyle}>
              <div style={{ position:'relative' }}>
                <div style={iconStyle}>
                  <PaladinCross style={{width: '45px', marginTop: '-4px', marginBottom:'-10px', }}/>
                </div>
                <h3 style={ { color: '#ffff11', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ stat }</h3>
              </div>
              <div style={{ position:'relative' }}>
                <div >
                <PaladinHammer style={{width: '45px', marginBottom:'-14px', transform: 'rotate(45deg)' }}/>
                </div>
                <h3 style={ { color: 'black', marginTop: '2px', display: 'inline-block', textShadow:'0 0 3px black' } }>{ dmg }</h3>
              </div>
              <div style={{ position:'relative' }}>
              <div style={iconStyle}>
                <FontAwesomeIcon icon="running" size="2xl" style={{color: "#baff29",}} />
              </div>
              <h3 style={ { color: '#baff29', margin: '5%', display: 'inline-block', textShadow:'0 0 3px black' } }>{ speed }</h3>
              </div>
            </div>
          </div>
    );
  }
}

Paladin.propTypes = {
  statSheet: PropTypes.object.isRequired,
}