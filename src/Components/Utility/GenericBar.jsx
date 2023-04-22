import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ReactComponent as FireRage} from '../../Styles/svgs/fireRage.svg';

export class GenericBar extends React.Component {
  render() {
    const { propValue, propMaxValue, propName } = this.props;
    const size = propValue / propMaxValue * 100;
    let firstColor = 'red';
    let secondColor = '#cc3000';
    let hpIcon = false;
    let mpIcon = false;
    let rageIcon = false;

    switch (propName) {
      case 'HP': hpIcon = true;
        break;
      case 'MP': mpIcon = true; firstColor = '#03f7ff'; secondColor = '#08b9bf';
        break;
      case 'Rage': rageIcon = true;  firstColor = '#d40412'; secondColor = '#9e020c';
        break;
      default: console.log('ERROR GENERIC BAR COLOR')
        break;
    }
    
    const outerDivStyle = {
      margin:'5px',
      position: 'relative',
    };

    const barBorderStyle = {
      border:'solid',
      marginLeft: '9.5%',
      marginRight: '8.5%',
      borderRadius: '10px',
      position: 'relative',
      paddingRight: '4px',
      backgroundColor: 'white',
      filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))",
    }
    const barStyle = {
      background: `linear-gradient(to bottom, ${firstColor}, ${secondColor})`,
      height: "25px",
      width: propValue !== 0 ? `${size}%` : propValue,
      transition: "width 0.3s ease-in-out",
      textAlign: 'center',
      color: 'black',
      margin:'2px',
      borderRadius: '6px',
      fontFamily: 'Roboto Mono, monospace',
      fontSize: '22px',
      fontWeight: 'bold',
      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7))" 
    };
    const textStyle = {
      width:'280px',
      height:'30px',
      position: "absolute",
      textAlign: "center",
    };
    const iconStyle = {
      width:'35px',
      height:'15px',
      position: "absolute",
      textAlign: "left",
      margin: '4px',
      stroke:'black',
      strokeWidth: '10%',
    };

    return (
      <div style={outerDivStyle}>
        <div style={iconStyle}>
          { hpIcon && <FontAwesomeIcon icon="heart" style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))", marginTop: '2px', color: "#ff2227"}} beat size="lg"/>}
          { mpIcon && <FontAwesomeIcon icon="flask" style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))", marginTop: '2px', color: 'cyan'}} size="xl"/>}
          { rageIcon && <FireRage style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))", stroke:'black', strokeWidth:'5%', margin: '-4px', marginTop: '-1px' }}/>}
        </div>
        <div style={barBorderStyle}>
            <div style={barStyle}>
            <div style={textStyle}> {`${propName}: ${propValue}`}</div>
        </div>
      </div>
    </div>
    )
  }
}

GenericBar.propTypes = {
  propValue: PropTypes.number.isRequired,
  propMaxValue: PropTypes.number.isRequired,
  propName: PropTypes.string.isRequired,
};