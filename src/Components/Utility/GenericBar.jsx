import React from "react";
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ReactComponent as FireRage} from '../../Styles/svgs/fireRage.svg'

export class GenericBar extends React.Component {
  render() {
    const { color, propValue, propMaxValue, propName } = this.props;
    const barStyle = {
      backgroundColor: color,
      height: "25px",
      width: propValue != 0 ? `${propValue / propMaxValue * 100}%` : propValue,
      transition: "width 0.5s ease-in-out",
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
    };

    const innerDivStyle = {
      width:'290px',
      height:'15px',
      position: "absolute",
      textAlign: "center",
    };
    const iconStyle = {
      width:'200px',
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
      <div style={{margin:'5px'}}>
        <div style={iconStyle}>
          { hpIcon && <FontAwesomeIcon icon="heart" style={{color: "#ff2227"}} beat size="lg"/>}
          { mpIcon && <FontAwesomeIcon icon="flask"  style={{color: 'cyan'}}  size="xl"/>}
          { rageIcon && <FireRage style={{ stroke:'black', strokeWidth:'5%', margin: '-4px', }}/>}
        </div>
        <div style={ { border:'solid', margin: '8.5%', marginTop: '-6%' } }>
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