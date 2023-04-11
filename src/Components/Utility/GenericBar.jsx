import React from "react";
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ReactComponent as FireRage} from '../../Styles/svgs/fireRage.svg'

export class GenericBar extends React.Component {
  render() {
    const { color, propValue, propMaxValue, propName } = this.props;
    const size = propValue / propMaxValue * 100;

    const outerDivStyle = {
      margin:'5px',
      position: 'relative',
    };

    const barBorderStyle = {
      border:'solid',
      marginLeft: '8.5%',
      marginRight: '8.5%',
      borderRadius: '10px',
      position: 'relative',
      paddingRight: '4px',
      backgroundColor: 'white'
    }
    // definir color e font
    const barStyle = {
      backgroundColor: color,
      height: "25px",
      width: propValue != 0 ? `${size}%` : propValue,
      transition: "width 0.3s ease-in-out",
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      margin:'2px',
      borderRadius: '6px',
    };
    const innerDivStyle = {
      width:'290px',
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

    let hpIcon = false;
    let mpIcon = false;
    let rageIcon = false;

    switch (propName) {
      case 'HP': hpIcon = true;
        break;
      case 'MP': mpIcon = true;
        break;
      case 'Rage': rageIcon = true;
        break;
    
      default:
        break;
    }

    return (
      <div style={outerDivStyle}>
        <div style={iconStyle}>
          { hpIcon && <FontAwesomeIcon icon="heart" style={{color: "#ff2227"}} beat size="lg"/>}
          { mpIcon && <FontAwesomeIcon icon="flask" style={{color: 'cyan'}} size="xl"/>}
          { rageIcon && <FireRage style={{ stroke:'black', strokeWidth:'5%', margin: '-4px', marginTop: '-1px' }}/>}
        </div>
        <div style={barBorderStyle}>
            <div style={barStyle}>
            <div style={innerDivStyle}> {`${propName}: ${propValue}`}</div>
        </div>
      </div>
    </div>
    )
  }
}

GenericBar.propTypes = {
  propValue: PropTypes.number.isRequired,
  propMaxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
};