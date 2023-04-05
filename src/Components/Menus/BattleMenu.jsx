import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { warriorTurn, mageTurn, paladinTurn } from "../../CharSkills";
import BattleStats from "../Utility/BattleStats";
import { enemyData } from "../../CharData";

export class BattleMenu extends React.Component {
  state = {
    intervals: [],
    battleStarted: false,
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    enemyQty: 0,
    enemyStat: [],
    teamStat: [],
    warriorBattleStats: [],
    mageBattleStats: [],
    paladinBattleStats: [],
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
    this.resetIntervals();
    this.giveExpMoney();
  }

  calculateEnemyQty = (lvl) => {
    let maxEnemies = 0;
    switch (true) {
      case lvl < 10: maxEnemies = 3;
        break;
        
      case lvl >= 10 && lvl < 20: maxEnemies = 4;
        break;

      case lvl >= 20 && lvl < 30: maxEnemies = 5;
        break;
    
      case lvl >= 30 && lvl < 40: maxEnemies = 6;
        break;

      case lvl >= 40 && lvl < 50: maxEnemies = 7;
        break;
    
      case lvl >= 50 && lvl < 60: maxEnemies = 8;
        break;

      case lvl >= 50: maxEnemies = 9;
      // depois fazer ifinitos metodos de inimigos tipo maxEnemies = lvl * x /10 
        break;

      default: console.log('ERRO ENEMY QTY')
        break;
    }
    return maxEnemies;
  }

  createTeams = () => {
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    this.setState({ teamStat: allyTeam });
    let totalLvl = 0;
    for(let i = 0; i < allyTeam.length; i++ ) {
      totalLvl += allyTeam[i].lvl;
    }
    this.setState({ teamLvl: totalLvl });
      const enemyList = enemyData;
      const enemyQty = this.calculateEnemyQty(totalLvl);
      const randEnemyQty = Math.floor(Math.random() * enemyQty) + 1;
      const randEnemies = [];
      for (let i = 0; i < randEnemyQty; i += 1) {
        const id = Math.floor(Math.random() * enemyList.length);
        const typeEnemy = enemyList[id];
        let enemy = {
          id: randEnemies.length,
          hp: Math.floor((Math.random() * (typeEnemy.hpMax - typeEnemy.hpMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.hpMin),
          classe: 'enemy',
          stat: Math.floor((Math.random() * (typeEnemy.statMax - typeEnemy.statMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.statMin),
          mp: 0,
          dmg: Math.floor((Math.random() * (typeEnemy.dmgMax - typeEnemy.dmgMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.dmgMin),
          speed: Math.floor((Math.random()* (typeEnemy.speedMax - typeEnemy.speedMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.speedMin),
          image: typeEnemy.image,
        };
        randEnemies.push(enemy);
      }
      this.setState({ enemyStat: randEnemies, enemyQty: enemyQty });
  }

  resetIntervals = () => {
    const { intervals } = this.state;
    intervals.forEach(interval => clearInterval(interval));
  }

  giveExpMoney = () => {
    const { teamStat, enemyQty, teamLvl } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamStat'));
    const battleOver = JSON.parse(localStorage.getItem('battleOver'));
    const moneys = JSON.parse(localStorage.getItem('moneys'));
    const { over, ally } = battleOver;
    const exp = Math.ceil(100 * 1 / enemyQty * Math.floor(teamLvl / 3));
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
     let battleStats = [];
     let turnResult = {};
     let prevTurnResult = 0;

     if(validTargets.length === 0) {
      clearInterval(atkAlly);
      this.setState({ enemyKilled: true })
      return
     }
     if (char.hp > 0) {
      switch (char.classe) {
        case 'Warrior':
            turnResult = warriorBattleStats.find(el => el.id === char.id);
            if (turnResult) {
              battleStats = warriorTurn(char, targetedEnemy, turnResult);
              prevTurnResult = battleStats.totalDmg;
              turnResult.totalDmg = prevTurnResult;
            this.setState({ warriorBattleStats: warriorBattleStats });
            } else {
              battleStats = warriorTurn(char, targetedEnemy);
              this.setState(prevState => {
                const prevStats = [...prevState.warriorBattleStats];
                prevStats.push(battleStats);
                return { warriorBattleStats: prevStats };
              });
            }
          break;

        case 'Mage': turnResult = mageBattleStats.find(el => el.id === char.id);
        if (turnResult) {
          battleStats = mageTurn(char, targetedEnemy, turnResult);
          prevTurnResult = battleStats.totalDmg;
          turnResult.totalDmg = prevTurnResult;
        this.setState({ mageBattleStats: mageBattleStats });
        } else {
          battleStats = mageTurn(char, targetedEnemy);
          this.setState(prevState => {
            const prevStats = [...prevState.mageBattleStats];
            prevStats.push(battleStats);
            return { mageBattleStats: prevStats };
          });
        }
          break;

        case 'Paladin': turnResult = paladinBattleStats.find(el => el.id === char.id);
        if (turnResult) {
          battleStats = paladinTurn(char, targetedEnemy, teamStat, turnResult);
          prevTurnResult = battleStats.totalDmg;
          turnResult.totalDmg = prevTurnResult;
          prevTurnResult = battleStats.totalHeal;
          turnResult.totalHeal = prevTurnResult;
        this.setState({ paladinBattleStats: paladinBattleStats });
        } else {
          battleStats = paladinTurn(char, targetedEnemy, teamStat);
          this.setState(prevState => {
            const prevStats = [...prevState.paladinBattleStats];
            prevStats.push(battleStats);
            return { paladinBattleStats: prevStats };
          });
        }
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
    const turns = []
    totalStat.forEach(char => {
      let attackSpeed = ((5000 / char.speed))
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamStat,  atkEnemy), attackSpeed);
        turns.push(atkEnemy);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyStat,  atkAlly), attackSpeed);
        turns.push(atkAlly);
       }}
    });
    this.setState({ intervals: turns });
  }

  returnHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
      const { teamStat, enemyStat, enemyKilled, allyKilled, battleStarted,
      warriorBattleStats, mageBattleStats, paladinBattleStats } = this.state;
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
            { battleStarted && <CustomButton type="button" onClick={ this.returnHome } label={ over ? 'Home' : 'Retreat' } />}
            { !battleStarted && <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />}
            </div>
            { over && <BattleStats
              warriorBattleStats={ warriorBattleStats }
              mageBattleStats={ mageBattleStats }
              paladinBattleStats={ paladinBattleStats }
              teamStat = { teamStat }
              /> }
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
