import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { paladinTurn } from "../../CharSkills/PaladinSkills";
import { mageTurn } from "../../CharSkills/MageSkills";
import { warriorTurn } from "../../CharSkills/WarriorSkills";

export class BattleMenu extends React.Component {
  state = {
    battleStarted: false,
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    enemyQty: 0,
    enemyStat: [],
    teamStat: [],
    warriorBattleStats: {},
    mageBattleStats: {},
    paladinBattleStats: {},
  }

  componentDidMount() {
    const over = { over: false, ally: 'alive', enemy: 'alive' } ;
    localStorage.setItem('battleOver', JSON.stringify(over))
    this.createTeams();
  }

  componentDidUpdate() {
    const { enemyKilled, allyKilled } = this.state;
    if (enemyKilled) {
      const over = { over: true, ally: 'alive', enemy: 'dead' };
      localStorage.setItem('battleOver', JSON.stringify(over))
    } 
    if (allyKilled) {
      const over = { over: true, ally: 'dead', enemy: 'alive' };
      localStorage.setItem('battleOver', JSON.stringify(over))
    }
  }

  componentWillUnmount() {
    this.giveExpMoney();
  }

  calculateEnemyQty = (lvl) => {
    let enemies = 0;
    switch (true) {
      case lvl < 5: enemies = 3;
        break;
        
      case lvl >= 5 && lvl < 10: enemies = 4;
        break;

      case lvl >= 10 && lvl < 20: enemies = 5;
        break;
    
      case lvl >= 20 && lvl < 30: enemies = 6;
        break;

      case lvl >= 30 && lvl < 40: enemies = 7;
        break;
    
      case lvl >= 40 && lvl < 50: enemies = 8;
        break;

      case lvl >= 50: enemies = 9;
      // depois fazer ifinitos metodos de inimigos tipo lvl * x /10 = enemies
        break;

      default: console.log('ERRO ENEMY QTY')
        break;
    }
    return enemies;
  }

  createTeams = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
    let totalLvl = 0;
    for(let i = 0; i < allyTeam.length; i++ ) {
      totalLvl += allyTeam[i].lvl;
    }
    this.setState({ teamLvl: totalLvl });
      const listaEnemies = [
        {
          hpMax: 300,
          hpMin: 200,
          statMax: 7,
          statMin: 3,
          dmgMax: 3,
          dmgMin: 1,
          speedMax: 5,
          speedMin: 2,
          image: 'SirQuack',
        },
        {
          hpMax: 35,
          hpMin: 25,
          statMax: 10,
          statMin: 8,
          dmgMax: 7,
          dmgMin: 5,
          speedMax: 10,
          speedMin: 5,
          image: 'Grat',
        },
        {
          hpMax: 93,
          hpMin: 20,
          statMax: 11,
          statMin: 6,
          dmgMax: 9,
          dmgMin: 2,
          speedMax: 7,
          speedMin: 1,
          image: 'Rand',
        },
      ];
      const enemyQty = this.calculateEnemyQty(totalLvl);
      const randEnemies = [];
      for (let i = 0; i < enemyQty; i += 1) {
        const id = Math.floor(Math.random() * listaEnemies.length);
        const typeEnemy = listaEnemies[id];
        let enemy = {
          id: randEnemies.length,
          hp: Math.floor((Math.random() * (typeEnemy.hpMax - typeEnemy.hpMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.hpMin),
          classe: 'enemy',
          stat: Math.floor((Math.random() * (typeEnemy.statMax - typeEnemy.statMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.statMin),
          mp: 0,
          dmg: Math.floor((Math.random() * (typeEnemy.dmgMax - typeEnemy.dmgMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.dmgMin),
          speed: Math.floor((Math.random()* (typeEnemy.speedMax - typeEnemy.speedMin + 1) * totalLvl/2 * 1/enemyQty) + typeEnemy.speedMin),
          image: typeEnemy.image,
        };
        randEnemies.push(enemy);
      }
      this.setState({ enemyStat: randEnemies, enemyQty: enemyQty });
  }

  giveExpMoney = () => {
    const { teamStat, enemyQty, teamLvl } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const battleOver = JSON.parse(localStorage.getItem('battleOver'));
    const moneys = JSON.parse(localStorage.getItem('moneys'));
    const { over, ally } = battleOver;
    const exp = Math.floor(100 * 1 / enemyQty * Math.floor(teamLvl / 3));
    if (over === true && ally === 'alive') {
      localStorage.setItem('moneys', JSON.stringify(exp + moneys));   
      for (let i = 0; i < teamStat.length; i += 1) {
        if (teamStat[i].hp > 0) {         
          allyTeam[i].exp += (exp * allyTeam[i].lvl );        
          localStorage.setItem('teamStat', JSON.stringify(allyTeam));
        }
      }
    }
  }

  damageFunc = (char, enemy, atkAlly) => {
     const { teamStat, enemyStat, warriorBattleStats, mageBattleStats, paladinBattleStats } = this.state; 
     const validTargets = enemy.filter((enm) => enm.hp > 0)
     const randTarget = Math.floor(Math.random() * validTargets.length);
     const targetedEnemy = validTargets[randTarget]
     let battleStats = {};

     if(validTargets.length === 0) {
      clearInterval(atkAlly);
      console.log('WARRIOR :', warriorBattleStats.totalDmg,'MAGE :', mageBattleStats.totalDmg,'PALADIN :', paladinBattleStats.totalDmg)
      this.setState({ enemyKilled: true })
      return
     }
     if (char.hp > 0) {
      switch (char.classe) {
        case 'Warrior': battleStats = warriorTurn(char, targetedEnemy, warriorBattleStats); 
          this.setState({ warriorBattleStats: battleStats });
          break;

        case 'Mage': battleStats = mageTurn(char, targetedEnemy, mageBattleStats);
          this.setState({ mageBattleStats: battleStats });
          break;

        case 'Paladin': battleStats = paladinTurn(char, targetedEnemy, teamStat, paladinBattleStats); 
          this.setState({ paladinBattleStats: battleStats });
          break;

        default: console.log('ERROR CLASS ATTACK');
        break;
      } 
     }
     if (targetedEnemy.hp < 0) { targetedEnemy.hp = 0}
     this.setState({ teamStat, enemyStat })
  };

  damageFuncEnemy = (char, ally, atkEnemy) => {
     const { teamStat, enemyStat } = this.state;
     const validTargets = ally.filter((hero) => hero.hp > 0);
     const damage = Math.floor(char.dmg + char.stat / 2.5 );
     const weightedChars = [];

     if(validTargets.length === 0) {
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
     
     if (char.hp > 0) { target.hp = target.hp - damage } 
     if (target.hp < 0) { target.hp = 0 }
    
     this.setState({teamStat, enemyStat});
  };

  battleStart = () => {
    const { teamStat, enemyStat } = this.state;
    this.setState({ battleStarted: true });
    const totalStat = [...teamStat, ...enemyStat ]
    totalStat.forEach(char => {
      let attackSpeed = ((5000 / char.speed))
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat, atkEnemy), attackSpeed);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat, atkAlly), attackSpeed);
       }}
    });
  }

  returnHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
      const { teamStat, enemyStat, enemyKilled, allyKilled, battleStarted } = this.state;
      //renderizar na tela algo tipo "batalha acabou e ter os logs / stats" quando battleOver === true
      let over = false
      if (enemyKilled || allyKilled) {
        over = true
      }
      const mystyle = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
       }
       const buttons = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
       }
      return (
          <>
            <div style={ buttons }>
            <CustomButton type="button" onClick={ this.returnHome } label={ 'Home' } />
            { !battleStarted && <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />}
            </div>
            { over && <div style={mystyle}> BATTLE OVER </div> }
             <div style={mystyle}>
            { enemyStat.length !== 0 && enemyStat.map((char, i) => 
             <div key={char.id + 'enemy' + i}>
             <GenericChar statSheet={char} />
             </div>
            )}
            </div>
            <div style={mystyle}>
            { teamStat.map((char) => 
             <div key={char.id}>
             <GenericChar statSheet={char} />
             </div>
            )}
             </div>
          </>
    )
  }
}

BattleMenu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
