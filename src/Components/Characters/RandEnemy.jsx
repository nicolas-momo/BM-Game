import React from "react";
import SirQuack from "../../Images/Enemies/sir_quack.png";
import Grat from "../../Images/Enemies/grat.png";
import Rand from "../../Images/Enemies/rand.png";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as Sword } from '../../Styles/svgs/sword.svg'
import '../../Styles/charStyle.css'

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
    const { hp, maxHp, mp, maxMp, dmg, speed, name } = statSheet;

    return (
      <div className="cardContainer">
        <div className="topContainer ">
          <div className="lvlExpContainer">
            <h3 className="lvlStyle">LVL: 1</h3>
          </div> 
          <h2 className="nameStyle">{ name }</h2>
        </div>
        <div style={ { marginTop: '-15%', } }>
          <img style={ { marginTop:'-10px', display: 'inline-block', height:'190px' } } src={ randImage } alt="Enemy"></img>
        </div>
        <div className="barsContainer">
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'Rage' } color={ '#cc3000' } />
        </div>
        <div className="gridStyle">
          <div className="gridItem">
            <div>
              <Sword className="dmgIcon"/>
            </div>
            <h3 className="statText">{ dmg }</h3>
          </div>
          <div className="gridItem">
            <div className="iconStyle">
              <FontAwesomeIcon icon="running" size="2xl" style={{color: "#baff29", height:'35px'}} />
            </div>
            <h3 className="statText">{ speed }</h3>
          </div>
        </div>
      </div>
    );
  }
}

RandEnemy.propTypes = {
  statSheet: PropTypes.object.isRequired,
}