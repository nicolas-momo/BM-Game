import React from "react";
import SirQuack from "../../Images/Enemies/sir_quack.png";
import Grat from "../../Images/Enemies/grat.png";
import Rand from "../../Images/Enemies/rand.png";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ReactComponent as Sword} from '../../Styles/svgs/swordSvg.svg'

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
    const { hp, maxHp, dmg, speed, name } = statSheet;
    const mystyle = {
      border: 'solid',
      borderRadius: '1rem',
      flexDirection: 'row',
      width: '25rem',
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
      gridTemplateColumns: '1fr 1fr',
      marginTop: '-3%'
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
          <div style={gridStyle}>
          <div style={{ position:'relative' }}>
            <div style={iconStyle}>
              <Sword style={{width: '35px', marginTop: '-2px', marginBottom:'-2px', }}/>
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

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}