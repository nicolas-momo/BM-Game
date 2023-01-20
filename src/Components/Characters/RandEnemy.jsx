import React from "react";
import SirQuack from "../../Images/Enemies/sir_quack.png";
import Grat from "../../Images/Enemies/grat.png";
import Rand from "../../Images/Enemies/rand.png";
import PropTypes from "prop-types"

export class RandEnemy extends React.Component {
  state = {
    randImage: null,
  }
  componentDidMount() {
    const { statSheet: { image } } = this.props;
    switch(image) {
      case 'SirQuack': 
        this.setState({ randImage: SirQuack });
        break;
      case 'Grat':
        this.setState({ randImage: Grat });
        break;
      case 'Rand':
        this.setState({ randImage: Rand });
        break;
    }
  }

  render() {
    const { statSheet } = this.props;
    const { randImage } = this.state;
    const { hp, stat, dmg, speed } = statSheet;
    const mystyle = {
      lineHeight: 0.5,
     }
      return (
          <>
           <div style={mystyle}>
            <h3>Health: {hp}</h3>
            <h3>Stat: {stat}</h3>
            {/* <h3>Mana: {mp}</h3> */}
            <h3>Damage: {dmg}</h3>
            <h3>Speed: {speed}</h3>
           </div>
            <img src={randImage} alt="RandEnemy"></img>
          </>
    );
  }
}

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}