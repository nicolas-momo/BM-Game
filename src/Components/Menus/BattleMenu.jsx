import React from "react";
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class BattleMenu extends React.Component {
  state = {
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    dano: 0,
    enemyStat: [
      { id: 0, hp: 100, classe: 'enemy', stat: 10, mp: 0, dmg: 10, speed: 35, },
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
        exp: 0,
      },
      {
        id: 1,
        classe: 'Mage',
        hp: 50,
        stat: 10,
        mp: 35,
        dmg: 10,
        speed: 7,
        exp: 0,
      }
    ],
  }

  componentDidMount() {
    const over = false;
    localStorage.getItem('battleOver', JSON.parse(over))
    this.createEnemy();
  }

  // Fazer coisa do XP aqui
  componentDidUpdate() {
    const { enemyKilled, allyKilled} = this.state;
    if ( enemyKilled || allyKilled ) {
      const over = true;
      localStorage.setItem('battleOver', JSON.parse(over))
      this.giveExp();
    }
  }

 // Ta dando 500 updates, precisa arrumar
  giveExp = () => {
    const { teamStat } = this.state;
      const exp = 25;
      for (let i = 0; i < teamStat.length; i += 1) {
        if (teamStat[i].hp > 0) {
          teamStat[i].exp += exp;
         localStorage.setItem('teamStat', JSON.stringify(teamStat));
      }
    }
  }

  warriorDmg = (char, targetedEnemy) => {
    const damage = Math.floor((char.dmg + char.stat  ) / 1.5)
    targetedEnemy.hp = targetedEnemy.hp - damage;
  }

  mageDmg = (char, targetedEnemy) => {
    let damage = 0;
    if (char.mp > 0) {
    damage = Math.floor((char.dmg + char.stat  ) / 1.5)
    char.mp = char.mp - 5;
    }
    targetedEnemy.hp = targetedEnemy.hp - damage;  
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

      default: console.log('ERRO');
       break;
     }
     this.setState({teamStat, enemyStat})
    //  console.log(enemy);
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
    //  console.log(ally);
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
      let attackSpeed = (char.speed * 100)
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy ), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat, atkAlly ), attackSpeed);
       }}
    });
  }

  returnHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
     const { teamStat, enemyStat } = this.state;
      const battleOver = localStorage.getItem('battleOver')
      return (
          <>
            <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />
            { battleOver && <CustomButton type="button" onClick={ this.returnHome } label={ 'Home' } /> } 
            { teamStat.map((char) => 
             <div key={char.id}>
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
