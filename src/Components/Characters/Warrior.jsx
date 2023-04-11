import React from "react";
import PropTypes from "prop-types"
import { GenericBar } from "../Utility/GenericBar";
import { ReactComponent as WarriorHelmet } from '../../Styles/svgs/warriorHelmet.svg'
import { ReactComponent as Sword } from '../../Styles/svgs/sword.svg'
import { ReactComponent as Scroll } from '../../Styles/svgs/scroll.svg'
import { ReactComponent as Strength } from '../../Styles/svgs/dumbbells.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import '../../Styles/charStyle.css'

class Warrior extends React.Component {
  charMenu = () => {
    const { history, statSheet: { id }  } = this.props;
    history.push(`/char/${id}`);
  }

  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, dmg, speed, exp, lvl, name, mp, maxMp } = statSheet;

    return (
      <div className="cardContainer">
        <div className="topContainer ">
          <div className="lvlExpContainer">
            <h3 className="lvlStyle">LVL: { lvl }</h3>
            <h3 className="expStyle">Exp: { exp }</h3>
          </div> 
          <h2 className="nameStyle">{ name }</h2>
        </div>
        <div className="scrollStyle" onClick={this.charMenu}>
          <Scroll className="charMenuIcon"/>
        </div>
        <div className="iconContainer">
          <WarriorHelmet className="svgIconStyle"/>
        </div>
        <div className="barsContainer">
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'Rage' } color={ '#cc3000' } />
        </div>
        <div className="gridStyle">
          <div className="gridItem">
            <div>
              <Strength className="statIcon"/>
            </div>
            <h3 className="statText">{ stat }</h3>
          </div>
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

Warrior.propTypes = {
  statSheet: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

export default withRouter(Warrior);