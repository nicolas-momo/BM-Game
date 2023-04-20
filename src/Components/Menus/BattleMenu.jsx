import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";
import { warriorTurn, mageTurn, paladinTurn } from "../../CharSkills";
import BattleStats from "../Utility/BattleStats";
import { ShowMoney } from "../Utility/ShowMoney";
import { createEnemies } from "../../HelperFuncs";
import { ShowFloor } from "../Utility/ShowFloor";

export class BattleMenu extends React.Component {
  state = {
    intervals: [],
    battleStarted: false,
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    enemyTeam: [],
    teamList: [],
    turnStats: [],
    currentFloor: 1,
    moneyQty: 0,
    classFunctions: {
      'Warrior': warriorTurn,
      'Mage': mageTurn,
      'Paladin': paladinTurn
    },
    expEarned: 0,
    moneyEarned: 0, 
  }

  componentDidMount() {
    const over = { over: false, ally: 'alive', enemy: 'alive' } ;
    localStorage.setItem('battleOver', JSON.stringify(over))
    this.setMaxFloor();
    this.createTeams();
    this.getMoneyQty();
  }

  componentDidUpdate() {
    const { enemyKilled, allyKilled } = this.state;
    if (enemyKilled || allyKilled) {
      this.resetIntervals();
    } 
  }

  componentWillUnmount() {
    this.resetIntervals();
  }

  resetState = () => {
    this.resetIntervals();
    this.getMoneyQty();
    this.setMaxFloor();
    this.setState({
      intervals: [],
      enemyTeam: [],
      battleStarted: false,
      enemyKilled: false,
      allyKilled: false,
      turnStats: [],
      expEarned: 0,
      moneyEarned: 0, 
    }, () =>  this.createTeams())
  }

  setMaxFloor = () => {
    const maxFloor = JSON.parse(localStorage.getItem('maxFloor')) || 1;
    this.setState({ currentFloor: maxFloor })
  }

  getMoneyQty = () => {
    const moneys = JSON.parse(localStorage.getItem('moneys')) || 0;
    this.setState({ moneyQty: moneys })
  }

  createTeams = () => {
    const { currentFloor } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamList'));
    const generatedEnemies = createEnemies(currentFloor);
    this.setState({ enemyTeam: generatedEnemies, teamList: allyTeam });
  }

  resetIntervals = () => {
    const { intervals } = this.state;
    intervals.forEach(interval => clearInterval(interval));
  }

  giveExpMoney = () => {
    const { teamList, currentFloor } = this.state;
    const allyTeam = JSON.parse(localStorage.getItem('teamList'));
    const allAlliesList = JSON.parse(localStorage.getItem('allAlliesList'));
    const maxFloor = JSON.parse(localStorage.getItem('maxFloor')) || 1;
    const currentMoneys = JSON.parse(localStorage.getItem('moneys'));
    const exp = Math.ceil(100 * (Math.pow(1.15, currentFloor)) / 3 );
    const money = Math.ceil((Math.random() * ((exp * 5) - (exp * 3))) + exp * 3);
    
    for (let i = 0; i < teamList.length; i += 1) {
      if (teamList[i].hp > 0) {    
        allyTeam[i].exp += Number(exp * allyTeam[i].lvl );
        const index = allAlliesList.findIndex((char) => char.id === allyTeam[i].id);
        if (index !== -1) {
          allAlliesList[index] = allyTeam[i];
        }
      }
    }

    if (maxFloor <= currentFloor) localStorage.setItem('maxFloor', JSON.stringify(currentFloor + 1));
    localStorage.setItem('moneys', JSON.stringify(money + currentMoneys));
    localStorage.setItem('teamList', JSON.stringify(allyTeam));
    localStorage.setItem('allAlliesList', JSON.stringify(allAlliesList));
    this.setState({ expEarned: exp, moneyEarned: money })
  }

  damageFunc = (char, enemy, atkAlly) => {
    const { teamList, enemyTeam, turnStats, classFunctions } = this.state; 
    const validTargets = enemy.filter((enm) => enm.hp > 0)
    const randTarget = Math.floor(Math.random() * validTargets.length);
    const targetedEnemy = validTargets[randTarget]
    const { id } = char;
    const battleFunction = classFunctions[char.classe];
    const turnResult = turnStats.find(el => el.id === char.id) || { id, totalDmg: 0, totalHeal: 0 };
    if(validTargets.length === 0) {
    clearInterval(atkAlly);
    this.setState({ enemyKilled: true })
    this.giveExpMoney();
    return
    }
    if (char.hp > 0) {
      const battleStats = battleFunction(char, targetedEnemy, turnResult, teamList);
      turnResult.totalDmg = battleStats.totalDmg;
      turnResult.totalHeal = battleStats.totalHeal;
      this.setState(prevState => {
      let prevStats = [...prevState.turnStats];
      let foundId = prevStats.find(el => el.id === char.id);
      if (foundId) {
        foundId = [battleStats];
      } else {
        prevStats.push(battleStats)
      }
      return { turnStats: prevStats };
      });
    } 
    if (targetedEnemy.hp < 0) { targetedEnemy.hp = 0}
    this.setState({ teamList, enemyTeam })
  };

  damageFuncEnemy = (char, ally, atkEnemy) => {
     const { teamList, enemyTeam } = this.state;
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
    
     this.setState({teamList, enemyTeam});
  };

  battleStart = () => {
    const { teamList, enemyTeam } = this.state;
    this.setState({ battleStarted: true });
    const totalTeams = [...teamList, ...enemyTeam ]
    const speedy = totalTeams.some(char => char.speed > 200)
    const ultraSpeedy = totalTeams.some(char => char.speed > 5000)
    let gameSpeed = ((5000))
    if (speedy) {
      gameSpeed = ((50000))
      if (ultraSpeedy) gameSpeed = ((500000))
    }
    const turns = []
    totalTeams.forEach(char => {
      const attackSpeed = ((gameSpeed / char.speed))
      if (char.hp > 0) {
      if (char.classe === 'enemy') {
        const atkEnemy = setInterval(() => this.damageFuncEnemy(char, teamList,  atkEnemy), attackSpeed);
        turns.push(atkEnemy);
       } else {
        const atkAlly = setInterval(() => this.damageFunc(char, enemyTeam,  atkAlly), attackSpeed);
        turns.push(atkAlly);
       }}
    });
    this.setState({ intervals: turns });
  }

  goTavern = () => {
    const { history } = this.props;
    history.push('/tavern');
  }

  goShop = () => {
    const { history } = this.props;
    history.push('/shop');
  }

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
      const { teamList, enemyTeam, enemyKilled, allyKilled, battleStarted,
      turnStats, moneyQty, expEarned, moneyEarned, currentFloor  } = this.state;
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
        width:'100vw',
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor:'#393D3F',
      }
    return (
      <>
        <div style={ buttons }>
          <CustomButton onClick={ this.goHome } label={ 'Home' } />
          <CustomButton onClick={ this.goTavern } label={ 'Tavern' } />
          <CustomButton onClick={ this.goShop } label={ 'Shop' } />
          <CustomButton type="button" onClick={ !battleStarted ? this.battleStart : null } label={ !battleStarted ?  'Start!' : 'Battling' } />
        </div>
        <ShowMoney moneyQty={ moneyQty }/>
        <ShowFloor floor={currentFloor}/>
        { over && <div>
          <BattleStats
          turnStats={ turnStats }
          teamList={ teamList }
          expEarned={ expEarned }
          moneyEarned={ moneyEarned }
          allyKilled={ allyKilled }
          enemyKilled={ enemyKilled }
          resetState={this.resetState}
          /> 
          </div>
        }
        <div style={mystyle}>
          { enemyTeam.length !== 0 && enemyTeam.map((char, i) => 
            <div key={char.id + 'enemy' + i}>
              <GenericChar statSheet={char} />
            </div>
          )}
        </div>
        <div style={mystyle}>
          { teamList.map((char) => 
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
