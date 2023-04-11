import React from 'react';
import PropTypes from "prop-types"

export class BattleStats extends React.Component {
  render() {
  const { turnStats, teamStat } = this.props;

  const names = teamStat.map(el => { return { id: el.id, name: el.name} } )

  if (turnStats.length > 0) {
    turnStats.forEach(char => {
    const turn = names.find(el => (Number(el.id) === Number(char.id)))
    char.name = turn.name
  })
  }
  
  return (
    <div style={{textAlign: 'center'}}>
      { turnStats.map((char, i) => {
      return (
      <div key={char.id + i}>
        <h2>{`${char.name} dmg: ${char.totalDmg}`} </h2>
      </div>
      )
       })}
    </div>
  );
  }
}

BattleStats.propTypes = {
  warriorBattleStats: PropTypes.array,
  mageBattleStats: PropTypes.array,
  paladinBattleStats: PropTypes.array,
}.isRequired;


export default BattleStats;
