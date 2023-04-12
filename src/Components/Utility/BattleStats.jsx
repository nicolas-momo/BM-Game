import React from 'react';
import PropTypes from "prop-types"

export class BattleStats extends React.Component {
  render() {
  const { turnStats, teamList } = this.props;

  const names = teamList.map(el => { return { id: el.id, name: el.name} } )

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
        <h2>{`${char.name} dmg: ${char.totalDmg} ${char.classe === "Paladin" ? `heal :` : ''}`} </h2>
        {char.classe === "Paladin" && <h2> ? `heal :`</h2> }
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
