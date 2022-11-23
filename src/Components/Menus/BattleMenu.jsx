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
      {
      hp: 60,
      classe: 'enemy',
      stat: 10,
      mp: 0,
      dmg: 6,
      speed: 5,
    },
      {
      hp: 55,
      classe: 'enemy',
      stat: 10,
      mp: 0,
      dmg: 7,
      speed: 15,
    }
   ],
    teamStat: [
      {
        id: 1,
        classe: 'Warrior',
        hp: 100,
        stat: 7,
        mp: 0,
        dmg: 5,
        speed: 12,
      },
      {
        id: 2,
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

      case 'Warrior': damage = Math.floor(char.dmg)
      validTargets[target].hp = validTargets[target].hp - damage;      
        break;
      case 'Mage': damage = Math.floor(char.dmg)
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
     const damage = Math.floor(char.dmg)
     validTargets[target].hp = validTargets[target].hp - damage;
     this.setState({teamStat, enemyStat})
     console.log(ally) 
  };

  battleStart = () => {
    const { teamStat, enemyStat } = this.state;
    const totalStat = [...teamStat, ...enemyStat ]
    totalStat.forEach(char => {
      let attackSpeed = (char.speed * 50)
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy ), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat, atkAlly ), attackSpeed);
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