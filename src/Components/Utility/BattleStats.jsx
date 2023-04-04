import React from 'react';
import PropTypes from "prop-types"

export class BattleStats extends React.Component {
  render() {
  // const { } = this.props;

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Battle Stats:</h2>
     
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
