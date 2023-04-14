import React from 'react';
import PropTypes from "prop-types"
import { CustomButton } from './CustomButton';
import { withRouter } from 'react-router-dom';
import { ReactComponent as CoinStack } from '../../Styles/svgs/coinStack.svg'
import '../../Styles/battleStats.css'
import { shrinkNum } from '../../HelperFuncs';

export class BattleStats extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
  const { turnStats, teamList, moneyEarned, expEarned, enemyKilled, allyKilled, resetState } = this.props;
  
  const shrunkMoney = shrinkNum(moneyEarned);
  const shrunkExp = shrinkNum(expEarned);

  const names = teamList.map(el => { return { id: el.id, name: el.name} } )

  if (turnStats.length > 0) {
    turnStats.forEach(char => {
    const turn = names.find(el => (Number(el.id) === Number(char.id)))
    char.name = turn.name
    })
  }

  return (
    <div className="coverScreen">
      <div className="battleStatsBox">
        { enemyKilled && <h1 className="victoryStyle">VICTORY</h1>}
        { allyKilled && <h1 className="defeatStyle">DEFEAT</h1>}
        <div className="lineStyle"></div>
        <div className="battleStatsGrid">
          <div className="battleStatsGold">
            <CoinStack className="battleStatsCoinStack"/>
            <h2 className="battleStatsGoldText">{`+${shrunkMoney}`}</h2>
          </div>
          <div className="battleStatsExp">
            <h2 className="gainExpStyle">EXP</h2>
            <h2 className="battleStatsExpText">{`+${shrunkExp}`}</h2>
          </div>
        </div>
          <div className="battleStatsOuterDiv" >
            <table className="battleStatsTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Damage</th>
                  <th>Healing</th>
                </tr>
              </thead>
              <tbody >
                {turnStats.map((char, i) => (
                  <tr key={char.id + i}>
                    <td>{char.name}</td>
                    <td>{char.totalDmg}</td>
                    <td>{char.totalHeal || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div className="battleStatsButtons">
            <CustomButton onClick={ this.goHome } label={ 'Home' } />
            <CustomButton onClick={ () => resetState() } label={ 'Continue' } />
        </div>
      </div>
    </div>
  )}
}

BattleStats.propTypes = {
  turnStats: PropTypes.array,
  expEarned: PropTypes.number,
  moneyEarned: PropTypes.number,
  enemyKilled: PropTypes.string,
  allyKilled: PropTypes.string,
  resetState: PropTypes.func,
}.isRequired;


export default withRouter(BattleStats);
