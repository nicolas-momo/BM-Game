import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as FireRage } from '../../Styles/svgs/fireRage.svg';
import { shrinkNum } from '../../HelperFuncs';

export class GenericBar extends React.Component {
  render() {
    const { propValue, propMaxValue, propName } = this.props;
    let size;
    let limitSize;
    let maxSize;
    const shrunkValue = shrinkNum(propValue);

    if(propMaxValue) {
     size = propValue / propMaxValue * 100;
     limitSize = size > 100 ? 100 : size;
     maxSize = shrinkNum(propMaxValue);
    } else {
      limitSize = 100;
      maxSize = 'MAX LVL' 
    }

    let firstColor = 'red';
    let secondColor = '#cc3000';
    let hpIcon = false;
    let mpIcon = false;
    let rageIcon = false;
    let renderExp = false;

    switch (propName) {
      case 'HP': hpIcon = true;
        break;
      case 'MP': mpIcon = true; firstColor = '#03f7ff'; secondColor = '#08b9bf';
        break;
      case 'Rage': rageIcon = true; firstColor = '#d40412'; secondColor = '#9e020c';
        break;
      case 'EXP': renderExp = true; firstColor = '#2cfc03'; secondColor = '#23cc02';
        break;
      default: console.log('ERROR GENERIC BAR COLOR')
        break;
    }

    const barStyle = {
      background: `linear-gradient(to bottom, ${firstColor}, ${secondColor})`,
      height: '25px',
      width: propValue !== 0 ? `${limitSize}%` : propValue,
      transition: 'width 0.3s ease-in-out',
      textAlign: 'center',
      color: 'black',
      margin:'2px',
      borderRadius: '6px',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: '22px',
      fontWeight: 'bold',
      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))',
    };

    const expStyle = {
      background: `linear-gradient(to bottom, ${firstColor}, ${secondColor})`,
      height: '20px',
      width: propValue !== 0 ? `${limitSize}%` : propValue,
      transition: 'width 0.3s ease-in-out',
      textAlign: 'center',
      color: 'black',
      margin:'2px',
      marginTop:'1px',
      marginLeft:'1px',
      borderRadius: '4px',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: '22px',
      fontWeight: 'bold',
      filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))' 
    };

    return (
    <div className='genericBarWrapper'>
      {!renderExp && (
        <div>
          <div className='genericBarIconWrapper'>
            { hpIcon && <FontAwesomeIcon icon='heart' className='genericBarHp' beat size='xl' />}
            { mpIcon && <FontAwesomeIcon icon='flask' className='genericBarMp' size='xl'/>}
            { rageIcon && <FireRage className='genericBarRage'/>}
          </div>
          <div className='genericBarStandardBorder'>
            <div style={barStyle}>
              <div className='genericBarStandardText'> {`${propName}: ${shrunkValue}`}</div>
            </div>
          </div>
        </div>
      )}
      {renderExp && (
        <div className='genericBarExpBorder'>
          <div style={expStyle}>
            <div className='genericBarExpText'> { propMaxValue ? `EXP to lvl: ${maxSize}` : maxSize }</div>
          </div>
        </div>
      )}
    </div>
    )
  }
}

GenericBar.propTypes = {
  propValue: PropTypes.number.isRequired,
  propMaxValue: PropTypes.number.isRequired,
  propName: PropTypes.string.isRequired,
};