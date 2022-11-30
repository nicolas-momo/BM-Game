import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class BattleMenu extends React.Component {
  state = {
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    enemyStat: [
      { id: 0, hp: 1000, classe: 'enemy', stat: 10, mp: 0, dmg: 10, speed: 15, },
      { id: 1, hp: 1000, classe: 'enemy', stat: 1, mp: 0, dmg: 1, speed: 1, },   
      { id: 2, hp: 4000, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 5, },
      { id: 3, hp: 2000, classe: 'enemy', stat: 20, mp: 0, dmg: 20, speed: 20, },
      { id: 4, hp: 3000, classe: 'enemy', stat: 5, mp: 0, dmg: 5, speed: 10, },
      { id: 5, hp: 5500, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 10, }, 
      { id: 6, hp: 7500, classe: 'enemy', stat: 5, mp: 0, dmg: 15, speed: 10, },  
      { id: 7, hp: 3500, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 5, },
      { id: 8, hp: 6000, classe: 'enemy', stat: 5, mp: 0, dmg: 10, speed: 20, },       
   ],
    teamStat: [],
  }

  componentDidMount() {
    const over = { over: false, ally: 'alive', enemy: 'alive' } ;
    localStorage.setItem('battleOver', JSON.stringify(over))
    this.createAllies();
    this.createEnemy();
  }

  componentDidUpdate() {
    const { enemyKilled, allyKilled} = this.state;
    if (enemyKilled) {
      const over = { over: true, ally: 'alive', enemy: 'dead' };
      localStorage.setItem('battleOver', JSON.stringify(over))
    } else if (allyKilled) {
      const over = { over: true, ally: 'dead', enemy: 'alive' };
      localStorage.setItem('battleOver', JSON.stringify(over))
    }
  }

  componentWillUnmount() {
    this.giveExp();
  }

  createAllies = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
  }

  giveExp = () => {
    const { teamStat } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const battleOver = JSON.parse(localStorage.getItem('battleOver'));
    const { over, ally } = battleOver;
    const exp = 25;
      if (over === true && ally === 'alive') {
        for (let i = 0; i < teamStat.length; i += 1) {
          if (teamStat[i].hp > 0) {         
            allyTeam[i].exp += exp;        
            localStorage.setItem('teamStat', JSON.stringify(allyTeam));
        }
      }   
    }
  }

  warriorDmg = (char, targetedEnemy) => {
    let damage = Math.floor((char.dmg + char.stat  ) / 1.5)
    char.counter = char.counter + 1
    switch (char.counter) {
      case 3: damage = 10;
        break;

      case 5: damage = 15;
        break;

      case 7: damage = 20;
         char.counter = 0
        break;
    
      default: damage = Math.floor((char.dmg + char.stat  ) / 1.5)
        break;
    }
    targetedEnemy.hp = targetedEnemy.hp - damage;
  }

  // mageDmg = (char, targetedEnemy) => {
  //   let damage = 0;
  //   char.counter = char.counter + 1
   
  //   if (char.counter === 3 && char.mp >= 10) {
  //     damage = 30;
  //     char.mp = char.mp - 10;
  //   } else if (char.counter === 5 && char.mp >= 15) { 
  //     damage = 50;
  //     char.mp = char.mp - 15;
  //   } else if (char.counter === 7 && char.mp >= 20) { 
  //     damage = 70;
  //     char.mp = char.mp - 20;
  //   } else {
  //     damage = Math.floor((char.dmg + char.stat  ) / 2)
  //     char.mp = char.mp + 10
  //   }
  //   if (char.counter === 7) {
  //     char.counter = 0;
  //   }
  //   console.log(damage, char.counter)
  //   targetedEnemy.hp = targetedEnemy.hp - damage;
  // }

  mageDmg = (char, targetedEnemy) => {
    const base = Math.floor((char.stat + char.dmg )/ 1.5);
    let damage =  Math.floor((char.stat + char.dmg )/ 1.5);
    char.counter = char.counter + 1;
    switch (char.counter) {
      case 3: if (char.mp >= 20) { damage = 3 * base }
       else if  (char.mp >= 10) { damage = Math.floor(1.5 * base) }       
        break;

      case 5: if (char.mp >= 30) { damage = 4 * base }
       else if  (char.mp >= 20) { damage = 2 * base }       
        break;
        
      case 7: if (char.mp >= 40) { damage = 5 * base }
       else if  (char.mp >= 30) { damage = Math.floor(2.5 * base) }       
        break;
    
      default: char.mp = char.mp + 10;
        break;
    }
    console.log(damage, char.counter)
    targetedEnemy.hp = targetedEnemy.hp - damage;
    if (targetedEnemy.hp >= 0) { char.mp = char.mp + 100 }
  }

  damageFunc = (char, enemy, atkAlly) => {
     const { teamStat, enemyStat, allyKilled } = this.state; 
     const validTargets = enemy.filter((enm) => enm.hp > 0)
     const randTarget = Math.floor(Math.random() * validTargets.length);
     const targetedEnemy = validTargets[randTarget]
     if(validTargets.length === 0 || allyKilled) {
      clearInterval(atkAlly); 
      this.setState({ enemyKilled: true })
      return
     }
     switch (char.classe) {

      case 'Warrior': this.warriorDmg(char, targetedEnemy);     
        break;

      case 'Mage': this.mageDmg(char, targetedEnemy);   
        break;

      default: console.log('ERROR CLASS ATTACK');
       break;
     }
     this.setState({teamStat, enemyStat})
  };

  damageFuncEnemy = (char, ally, atkEnemy) => {

     const { teamStat, enemyStat, enemyKilled } = this.state;
     const validTargets = ally.filter((hero) => hero.hp > 0);
     const damage = Math.floor(char.dmg + char.stat / 2.5 );
     const weightedChars = [];

     if(validTargets.length === 0 || enemyKilled) {
      clearInterval(atkEnemy);
      this.setState({ allyKilled: true })  
      return
     }

     validTargets.forEach((hero) => {
      for (let i = 0; i < hero.weight; i += 1) {
        weightedChars.push(hero);      
      }
     });
     const index = Math.floor(Math.random() * weightedChars.length);
     const target = weightedChars[index];
     
     target.hp = target.hp - damage;
 
     this.setState({teamStat, enemyStat});
  };

  createEnemy = () => {
    const { enemyStat } = this.state;
    const randNum =  Math.floor(Math.random() * 3) + 1 ;
    const randEnemy = [];
      for (let i = 0; i < randNum; i += 1) {
        const id = Math.floor(Math.random() * enemyStat.length)
        randEnemy.push(enemyStat[id])
      }
      this.setState({enemyStat: randEnemy})
  }

  battleStart = () => {
    const { teamStat, enemyStat } = this.state;
    const totalStat = [...teamStat, ...enemyStat ]
    totalStat.forEach(char => {
      let attackSpeed = ((5000 / char.speed))
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy ), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat, atkAlly ), attackSpeed);
       }}
    });
  }

  testeCoisa = () => {
    console.log('battleOver')
  }

  returnHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
     const { teamStat, enemyStat, enemyKilled, allyKilled } = this.state;
      //renderizar na tela algo tipo "batalha acabou quando battleOver === true"
        let over = false
        if (enemyKilled || allyKilled) {
           over = true
        }
        const mystyle = {
          color: "white",
          backgroundColor: "DodgerBlue",
          padding: "10px",
          fontFamily: "Arial",
          display: "flex",
          "flex-wrap": "wrap",
         "flex-direction": "row",
        };
      return (
          <>
            <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />
            <CustomButton type="button" onClick={ this.returnHome } label={ 'Home' } />
            { over && <div style={mystyle}  > teste</div> }
            { teamStat.map((char) => 
             <div key={char.id} style={mystyle} >
             <GenericChar statSheet={char} />
             </div>
            )}
            { enemyStat.map((char, i) => 
             <div key={char.id + 'enemy' + i}>
             <GenericChar statSheet={char} />
             </div>
            )}
          </>
    )
  }
}

BattleMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
