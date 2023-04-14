import React from "react";
import PropTypes from "prop-types"
import { GenericBar } from "../Utility/GenericBar";
import { ReactComponent as PaladinShield } from '../../Styles/svgs/paladinShield.svg'
import { ReactComponent as PaladinCross } from '../../Styles/svgs/paladinCross.svg'
// import { ReactComponent as PaladinHammer } from '../../Styles/svgs/paladinHammer.svg'
import { ReactComponent as Sword } from '../../Styles/svgs/sword.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as Scroll } from '../../Styles/svgs/scroll.svg'
import { withRouter } from "react-router-dom";
import '../../Styles/charStyle.css'
import { shrinkNum } from "../../HelperFuncs";

class Paladin extends React.Component {
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
          <PaladinShield className="svgIconStyle"/>
        </div>
        <div className="barsContainer">
          <GenericBar propValue={hp} propMaxValue={maxHp} propName={ 'HP' }/>
          <GenericBar propValue={mp} propMaxValue={maxMp} propName={ 'MP' }/>
        </div>
        <div className="gridStyle">
          <div className="gridItem">
            <div>
              <PaladinCross className="statIcon"/>
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

Paladin.propTypes = {
  statSheet: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}
export default withRouter(Paladin);