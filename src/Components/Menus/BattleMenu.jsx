import React from "react";
import PropTypes from 'prop-types';
import { CustomButton } from "../Utility/CustomButton";
import { GenericChar } from "../Utility/GenericChar";

export class BattleMenu extends React.Component {
  state = {
    enemyKilled: false,
    allyKilled: false,
    battleOver: false,
    enemyQty: 0,
    enemyStat: [],
    teamStat: [],

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
          speedMax: 7,
          speedMin: 3,
          image: 'SirQuack',
        },
        {
          hpMax: 35,
          hpMin: 25,
          statMax: 10,
          statMin: 8,
          dmgMax: 7,
          dmgMin: 5,
          speedMax: 15,
          speedMin: 10,
          image: 'Grat',
        },
        {
          hpMax: 93,
          hpMin: 20,
          statMax: 11,
          statMin: 6,
          dmgMax: 9,
          dmgMin: 2,
          speedMax: 15,
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
          speed: Math.floor((Math.random()* (typeEnemy.speedMax - typeEnemy.speedMin + 1) * totalLvl * 1/enemyQty) + typeEnemy.speedMin),
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
    const exp = 25 * enemyQty * teamLvl;
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

  warriorTurn = (char, targetedEnemy) => {
    let damage = Math.floor((char.dmg + char.stat  ) / 1.5);
    char.counter = char.counter + 1;
    switch (char.counter) {
      case 3: damage = 10;
        break;

      case 5: damage = 15;
        break;

      case 7: damage = 20;
         char.counter = 0;
        break;
    
      default: damage = Math.floor((char.dmg + char.stat  ) / 1.5);
        break;
    }
    targetedEnemy.hp = targetedEnemy.hp - damage;
    if (targetedEnemy.hp <= 0) { char.hp = char.hp + Math.floor(char.maxHp / 4) }
  }

  mageTurn = (char, targetedEnemy) => {
    const base = Math.floor((char.stat + char.dmg )/ 1.5);
    let damage =  Math.floor((char.stat + char.dmg )/ 1.5);
    char.counter = char.counter + 1;
    switch (char.counter) {
      case 3: if (char.mp >= 20) { char.mp = char.mp - 20; damage = 3 * base }
       else if  (char.mp >= 10) { char.mp = char.mp - 10; damage = Math.floor(1.5 * base) }       
        break;

      case 5: if (char.mp >= 30) { char.mp = char.mp - 30; damage = 4 * base }
       else if  (char.mp >= 20) { char.mp = char.mp - 20; damage = 2 * base }       
        break;
        
      case 7: if (char.mp >= 40) { char.mp = char.mp - 40; damage = 5 * base }
       else if  (char.mp >= 30) { char.mp = char.mp - 30; damage = Math.floor(2.5 * base) } 
       char.counter = 0;      
        break;
    
      default: char.mp = char.mp + 10;
        break;
    }
    targetedEnemy.hp = targetedEnemy.hp - damage;
    if (targetedEnemy.hp <= 0) { char.mp = char.mp + 100 }
  }

  paladinTurn = (char, targetedEnemy) => {
    const { teamStat } = this.state;
    const baseDmg = ((char.dmg + char.stat  ) / 1.5);
    const baseHeal = (char.stat * char.maxHp / 100)
    let damage = Math.floor((char.dmg + char.stat  ) / 1.5);
    let heal = 0;
    const validTargets = teamStat.filter((hero) => hero.hp > 0);
    const lowestHp = validTargets.reduce((prev, curr) => {
      return (prev.maxHp - prev.hp) > (curr.maxHp - curr.hp) ? prev : curr;
     }, []);
    char.counter = char.counter + 1;
    switch (char.counter) {
      case 2: 
        if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
          heal = baseHeal; 
          damage = 0;
          if (char.mp >= 10) {
            char.mp = char.mp - 10;
            lowestHp.hp = lowestHp.hp + heal;
            if (lowestHp.hp > lowestHp.maxHp) {
              lowestHp.hp = lowestHp.maxHp;
            }
          }
        }
        else { char.mp = char.mp + 5;}  
        break;

      case 3: damage = Math.floor(baseDmg * 1.2);
        break;

      case 4: heal = baseHeal * 2;
        if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
          damage = 0;
          if (char.mp >= 15) {
            char.mp = char.mp - 15;
            lowestHp.hp = lowestHp.hp + heal;
            if (lowestHp.hp > lowestHp.maxHp) {
              lowestHp.hp = lowestHp.maxHp } 
          }
        } else { char.mp = char.mp + 5;}  
        break;

      case 5: damage = Math.floor(baseDmg * 2);
        break;

      case 6: heal = Math.floor(baseHeal * 1.5);
        if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
          damage = 0;
          if (char.mp >= 20) {
            char.mp = char.mp - 20;
            validTargets.forEach((hero) => {
              hero.hp = hero.hp + heal;
              if (hero.hp > hero.maxHp) { hero.hp = hero.maxHp }
            })}
          } else { char.mp = char.mp + 5;}
         char.counter = 0;
        break;

      default: damage = Math.floor((char.dmg + char.stat  ) / 1.5)
        break;
      }
    targetedEnemy.hp = targetedEnemy.hp - damage;
  }

  damageFunc = (char, enemy, atkAlly) => {
     const { teamStat, enemyStat } = this.state; 
     const validTargets = enemy.filter((enm) => enm.hp > 0)
     const randTarget = Math.floor(Math.random() * validTargets.length);
     const targetedEnemy = validTargets[randTarget]
     if(validTargets.length === 0) {
      clearInterval(atkAlly); 
      this.setState({ enemyKilled: true })
      return
     }
     if (char.hp > 0) {
      switch (char.classe) {
        case 'Warrior': this.warriorTurn(char, targetedEnemy);     
          break;

        case 'Mage': this.mageTurn(char, targetedEnemy);   
          break;

        case 'Paladin': this.paladinTurn(char, targetedEnemy);   
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
            <CustomButton type="button" onClick={ this.battleStart } label={ 'Start!' } />
            </div>
            { over && <div style={mystyle}  > BATTLE OVER </div> }
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
