import React from "react";
import PropTypes from "prop-types"

export class BattleMenu extends React.Component {

  damageFunc = (char, enemy, batata) => {
     let damage;
     switch (char.classe) {

      case 'Warrior': damage = Math.floor(char.dmg)
      enemy.hpE = enemy.hpE - damage;        
        break;
      case 'Mage':  damage = Math.floor(char.dmg)
      enemy.hpE = enemy.hpE - damage;        
        break;
      default: console.log('ERRO');
       break;
     }
      if(enemy.hpE <= 0) {
        enemy.hpE = 0;
        clearInterval(batata);
      }
     console.log(char);
  };

  damageFuncEnemy = (char, ally, batata2) => {
     let target = Math.floor(Math.random() * ally.length -1);
      
     const damage = Math.floor(char.dmgE)
     ally[1].hp = ally[1].hp - damage; 
      
     if(ally[target].hp <= 0 ) { 
      if(target === 1) target = 2;
      
     };    
     console.log(ally[1].hp);
  };


  battleStart = ( teamStat, enemyStat ) => {
    teamStat = [...teamStat, enemyStat ]
    teamStat.forEach(char => {
      const attackSpeed = (char.speed * 100)
      if(char.classe === 'enemy') {
        const batata2 = setInterval(() => this.damageFuncEnemy(char, teamStat, batata2 ), attackSpeed);
       } else {
        const batata = setInterval(() => this.damageFunc(char, enemyStat, batata ), attackSpeed);
       }     
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
  teamStat: PropTypes.array.isRequired,
  enemyStat: PropTypes.object.isRequired,
}