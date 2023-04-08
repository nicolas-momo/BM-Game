import React from "react";
import SirQuack from "../../Images/Enemies/sir_quack.png";
import Grat from "../../Images/Enemies/grat.png";
import Rand from "../../Images/Enemies/rand.png";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";

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
    const { hp, maxHp, stat, dmg, speed, name } = statSheet;
    const mystyle = {
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      width: '25rem',
      backgroundColor: '#c2c2c2',
      textAlign: 'center',
      margin: '5%',
    }
      return (
        <div style={ mystyle }>
        <h2 style={ { color: 'black', textAlign: 'center', } }> { name }</h2>
        <div style={ { marginTop: '-10%', } }>
          {/* <h3 style={ { color: 'black', margin: '10%', display: 'inline-block', width: '30%', } }>Level: { lvl }</h3> */}
        </div>
        <div style={ { marginTop: '-15%', } }>
          <img style={ { margin: "10%", width: '20%', height: '40%', display: 'inline-block', } } src={ randImage } alt="Mage"></img>
        </div>
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
        <div style={ { marginTop: '-15%', } }>
          <h3 style={ { color: '#9b00a6', margin: '10%', display: 'inline-block', width: '30%', } }>Faith: { stat }</h3>
          <h3 style={ { color: '#000ea6', margin: '10%', display: 'inline-block', width: '30%', } }>Attack: { dmg }</h3>
        </div>
        <h3 style={ { color: '#fad905', marginTop: '-8%', } }>Speed: { speed }</h3>
      </div>
    );
  }
}

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}