import React from 'react';
import PropTypes from "prop-types"

export class BattleStats extends React.Component {
  render() {
  const { warriorBattleStats, mageBattleStats, paladinBattleStats, teamStat } = this.props;

  const names = teamStat.map(el => { return { id: el.id, name: el.name} } )

  if (warriorBattleStats.length > 0) {
  warriorBattleStats.forEach(warrior => {
     const char = names.find(el => (Number(el.id) === Number(warrior.id)))
     warrior.name = char.name
  })
  }
  if (mageBattleStats.length > 0) {
  mageBattleStats.forEach(mage => {
     const char = names.find(el => (Number(el.id) === Number(mage.id)))
     mage.name = char.name
  })
  }
  if (paladinBattleStats.length > 0) {
  paladinBattleStats.forEach(paladin => {
     const char = names.find(el => (Number(el.id) === Number(paladin.id)))
     paladin.name = char.name
  })
  }

  return (
    <div style={{textAlign: 'center'}}>
      {warriorBattleStats.map((warrior, i) => {
      return <div key={warrior.id + i}>
      <h2>{`${warrior.name} dmg: ${warrior.totalDmg}`} </h2>
      </div>
       })}
      {mageBattleStats.map((mage, i)=> {
      return <div key={mage.id + i}>
      <h2>{`${mage.name} dmg: ${mage.totalDmg}`} </h2>
      </div>
      
       })}
     {paladinBattleStats.map((paladin, i) => {
      return <div key={paladin.id + i}>
      <h2>{`${paladin.name} dmg: ${paladin.totalDmg} heal: ${paladin.totalHeal}`} </h2>
      </div>
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
