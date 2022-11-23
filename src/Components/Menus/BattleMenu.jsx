import React from "react";
import { CustomButton } from "../Utility/CustomButton";
import { Warrior } from "../Warrior";
import { Mage } from "../Mage";
import { RandEnemy } from "../RandEnemy";

export class BattleMenu extends React.Component {
  state = {
    enemyKilled: false,
    allyKilled: false,
    enemyStat: [
      { id: 0, hp: 100, classe: 'enemy', stat: 10, mp: 0, dmg: 2, speed: 15, },
      { id: 1, hp: 1, classe: 'enemy', stat: 1, mp: 0, dmg: 1, speed: 1, },   
      { id: 2, hp: 40, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 5, },
      { id: 3, hp: 20, classe: 'enemy', stat: 20, mp: 0, dmg: 20, speed: 20, },
      { id: 4, hp: 30, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 10, },
      { id: 5, hp: 55, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 10, }, 
      { id: 6, hp: 75, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 10, },  
      { id: 7, hp: 35, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 5, },
      { id: 8, hp: 60, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 20, },       
   ],
    teamStat: [
      {
        id: 0,
        classe: 'Warrior',
        hp: 100,
        stat: 7,
        mp: 0,
        dmg: 5,
        speed: 12,
      },
      {
        id: 1,
        classe: 'Mage',
        hp: 50,
        stat: 10,
        mp: 35,
        dmg: 10,
        speed: 7,
      }
    ],
  }

  damageFunc = (char, enemy, atkAlly) => {
     const { teamStat, enemyStat, allyKilled } = this.state; 
     let damage; 
     const validTargets = enemy.filter((enm) => enm.hp > 0)
     const target = Math.floor(Math.random() * validTargets.length);
     if(validTargets.length === 0 || allyKilled) {
      clearInterval(atkAlly); 
      this.setState({ enemyKilled: true })
      return
     }
     switch (char.classe) {

      case 'Warrior': damage = Math.floor((char.dmg + char.stat  ) / 1.5)
      validTargets[target].hp = validTargets[target].hp - damage;      
        break;
      case 'Mage': 
      if (char.mp > 4) {
        damage = Math.floor((char.dmg + char.stat  ) / 1.5)
        char.mp = char.mp - 5;
      } else {
        damage = 0;
      }
      validTargets[target].hp = validTargets[target].hp - damage;          
        break;
      default: console.log('ERRO');
       break;
     }
     this.setState({teamStat, enemyStat})
     console.log(enemy);
  };

  damageFuncEnemy = (char, ally, atkEnemy) => {
     const { teamStat, enemyStat, enemyKilled } = this.state;
     const validTargets = ally.filter((hero) => hero.hp > 0);
     if(validTargets.length === 0 || enemyKilled) {
      clearInterval(atkEnemy);
      this.setState({ allyKilled: true })  
      return
     };
     const target = Math.floor(Math.random() * validTargets.length);
     const damage = Math.floor(char.dmg + char.stat / 2.5 );
     validTargets[target].hp = validTargets[target].hp - damage;
     this.setState({teamStat, enemyStat});
     console.log(ally);
  };

  battleStart = () => {
    const { teamStat, enemyStat } = this.state;
    const randNum =  Math.floor(Math.random() * 3) + 1 ;
    const randEnemy = [];
      for (let i = 0; i < randNum; i += 1) {
        const id = Math.floor(Math.random() * enemyStat.length)
        randEnemy.push(enemyStat[id])
      }
    const totalStat = [...teamStat, ...randEnemy ]
    totalStat.forEach(char => {
      let attackSpeed = (char.speed * 100)
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy ), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, randEnemy, atkAlly ), attackSpeed);
       }}     
    });
  } 

  render() {
     const { teamStat, enemyStat } = this.state;
      return (
          <>
            <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />                              
            <Warrior statSheet={teamStat[0]}/>             
            <Mage statSheet={teamStat[1]}/>   
            <RandEnemy statSheet={enemyStat[0]}/>
            <RandEnemy statSheet={enemyStat[1]}/>                                                     
          </>
    )
  }
}
