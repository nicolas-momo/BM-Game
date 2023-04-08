import React from "react";
import PropTypes from "prop-types"

export class GenericBar extends React.Component {
  render() {
    const { color, propValue, propMaxValue, propName } = this.props;
    const barStyle = {
      backgroundColor: color,
      height: "20px",
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

    return (
      <div style={ { border:'solid', margin: '8.5%', marginTop: '-5%' } }>
        <div style={barStyle}>
          <div style={innerDivStyle}> {`${propName}: ${propValue}`}</div>
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