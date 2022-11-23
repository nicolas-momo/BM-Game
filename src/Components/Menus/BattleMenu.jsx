import React from "react";
import PropTypes from "prop-types"

export class BattleMenu extends React.Component {
  state = {
    enemyKilled: false
  }

  damageFunc = (char, enemy, atkAlly) => {
     let damage; 
     const validTargets = enemy.filter((enm) => enm.hp > 0)
     const target = Math.floor(Math.random() * validTargets.length);
     if(validTargets.length === 0) {
      clearInterval(atkAlly); 
      this.setState({ enemyKilled: true })
      return
     } 
     switch (char.classe) {

      case 'Warrior': damage = Math.floor(char.dmg)
      validTargets[target].hp = validTargets[target].hp - damage;      
        break;
      case 'Mage': damage = Math.floor(char.dmg)
      validTargets[target].hp = validTargets[target].hp - damage;          
        break;
      default: console.log('ERRO');
       break;
     } 
     console.log(enemy);
  };

  damageFuncEnemy = (char, ally, atkEnemy) => {
     const { enemyKilled } = this.state; 
     const validTargets = ally.filter((hero) => hero.hp > 0);
     if(validTargets.length === 0 || enemyKilled) {
      clearInterval(atkEnemy);  
      return
     };
     const target = Math.floor(Math.random() * validTargets.length);
     const damage = Math.floor(char.dmg)
     validTargets[target].hp = validTargets[target].hp - damage;
     console.log(ally) 
  };

  battleStart = ( teamStat, enemyStat ) => {
    const totalStat = [...teamStat, ...enemyStat ]
    totalStat.forEach(char => {
      let attackSpeed = (char.speed * 200)
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy ), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat, atkAlly ), attackSpeed);
       }}     
    });
  } 

  render() {
     const { teamStat, enemyStat } = this.props;
      return (
          <>
            <button type="button" onClick={ () => this.battleStart(teamStat, enemyStat) }> BATTLE! </button>
          </>
    );
  }
}

BattleMenu.propTypes = {
  teamStat: PropTypes.arrayOf(PropTypes.object).isRequired,
  enemyStat: PropTypes.arrayOf(PropTypes.object).isRequired,
}