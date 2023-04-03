import React from 'react';
import PropTypes from "prop-types"

export class BattleStats extends React.Component {
  render() {
  const { warriorBattleStats, mageBattleStats, paladinBattleStats } = this.props;

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Battle Stats:</h2>
      <ul style={{border: '2px solid black', padding: '10px', margin: '0 auto', width: '300px'}}>
        <li style={{listStyle: 'none', marginBottom: '10px'}}>Warrior Total Damage: {warriorBattleStats.totalDmg}</li>
        <li style={{listStyle: 'none', marginBottom: '10px'}}>Mage Total Damage: {mageBattleStats.totalDmg}</li>
        <li style={{listStyle: 'none', marginBottom: '10px'}}>Paladin Total Damage: {paladinBattleStats.totalDmg}</li>
        <li style={{listStyle: 'none', marginBottom: '10px'}}>Paladin Total Heal: {paladinBattleStats.totalHeal}</li>
      </ul>
    </div>
  );
  }
}


BattleStats.propTypes = {
  warriorBattleStats: PropTypes.shape({
    totalDmg: PropTypes.number.isRequired,
  }),
  mageBattleStats: PropTypes.shape({
    totalDmg: PropTypes.number.isRequired,
  }),
  paladinBattleStats: PropTypes.shape({
    totalDmg: PropTypes.number.isRequired,
    totalHeal: PropTypes.number.isRequired,
  }),
}.isRequired;


export default BattleStats;
