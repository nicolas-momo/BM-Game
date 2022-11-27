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

      default: console.log('ERROR CLASS ATTACK');
       break;
     }
     this.setState({teamStat, enemyStat})
  };
  // dava um bug aleatorio usando o find, entao fiz uma func bolada com reduce
  // cria um object { classe: position } com uma key pra cada ally
  // vai dar problemas se tiver multiplos da mesma classe, probably
  targetWeights = (ally) => {
    const findPosition = ally.reduce((acc, cur) => {
      const { classe, position } = cur;
      const key = classe 
      acc[key] = position;
      return acc;
    }, {});
    return findPosition;
  }

  damageFuncEnemy = (char, ally, atkEnemy) => {
     const { teamStat, enemyStat, enemyKilled } = this.state;
     const validTargets = ally.filter((hero) => hero.hp > 0);
     const positions = this.targetWeights(ally);
     const damage = Math.floor(char.dmg + char.stat / 2.5 );

     if(validTargets.length === 0 || enemyKilled) {
      clearInterval(atkEnemy);
      this.setState({ allyKilled: true })  
      return
     }

     let target;
     const randNum = Math.random() * ally.length;
     const warriorTaunt = ally.length / 8;
    // ta um nojo, depois me ajuda a arrumar pls, talvez um switch ou algo com states
    // fiz isso 3:36am help
      if (randNum > warriorTaunt) {
          target = positions.Warrior
          if (ally[target].hp > 0) {
            ally[target].hp = ally[target].hp - damage;
            } else { 
            target = positions.Mage;
            ally[target].hp = ally[target].hp - damage;
          }
        } else if (randNum < warriorTaunt) {
        target = positions.Mage;
        ally[target].hp = ally[target].hp - damage;
      }
     this.setState({teamStat, enemyStat});
     console.log(ally[target])
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
      return (
          <>
            <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />
            <CustomButton type="button" onClick={ this.returnHome } label={ 'Home' } />
            { over && <CustomButton type="button" onClick={  this.testeCoisa } label={ 'teste' } /> }
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

BattleMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
