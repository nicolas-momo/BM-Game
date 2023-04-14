import React from "react";
import PropTypes from "prop-types";
import { GenericBar } from "../Utility/GenericBar";
import { ReactComponent as WizHat } from '../../Styles/svgs/wizardHat.svg'
import { ReactComponent as Scroll } from '../../Styles/svgs/scroll.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import '../../Styles/charStyle.css';
import { shrinkNum } from "../../HelperFuncs";

export class Mage extends React.Component {
  charMenu = () => {
    const { history, statSheet: { id }  } = this.props;
    history.push(`/char/${id}`);
  }
  render() {
    const { statSheet } = this.props;
    const { hp, maxHp, stat, mp, maxMp, dmg, speed, exp, lvl, name } = statSheet;
    const shrunkExp = shrinkNum(exp)

    return (
      <div className="cardContainer">
        <div className="topContainer ">
          <div className="lvlExpContainer">
            <h3 className="lvlStyle">LVL: { lvl }</h3>
            <h3 className="expStyle">Exp: { shrunkExp }</h3>
          </div> 
          <h2 className="nameStyle">{ name }</h2>
        </div>
        <div className="scrollStyle" onClick={this.charMenu}>
          <Scroll className="charMenuIcon"/>
        </div>
        <div className="iconContainer">
          <WizHat className="svgIconStyle"/>
        </div>
        <div className="barsContainer">
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' } color={ 'red' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' } color={ '#03f7ff' } />
        </div>
        <div className="gridStyle">
          <div className="gridItem">
            <div className="iconStyle">
              <FontAwesomeIcon icon="wand-sparkles" size="2xl" style={{color: '#9b00a6'}} />
            </div>
            <h3 className="statText">{ stat }</h3>
          </div>
          <div className="gridItem">
            <div className="iconStyle">
              <FontAwesomeIcon icon="meteor" flip="horizontal" size="2xl" style={{color: "#5a48ff"}} />
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

Mage.propTypes = {
  statSheet: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

export default withRouter(Mage);