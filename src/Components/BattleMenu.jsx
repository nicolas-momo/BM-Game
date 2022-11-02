import React from "react";
// import Warrior from "./Warrior"
// import Mage from "./Mage"
// import RandEnemy from './RandEnemy';
// import PropTypes from "prop-types"

export class BattleMenu extends React.Component {
 state = {coisa: 5 }
 // Criar func que faz turnos passarem ate inimigo OU Aliado morrer

  battleStart = () => {
  //  const { coisa } = this.state;
    let teste1 = 100;
    let num = 133700;
    // let teste2 = 50;
   setInterval((() => { teste1 = teste1 -1; if(true) for(let i = 0; i < 500; i++ ) {
    let x = num + i;
    let y = Math.sqrt(x)
    num = x + y 
    console.log(i)
   }}), 250);
   setInterval((() => teste1 = teste1 +1), 250);
   setInterval((() => console.log(teste1)), 250);
  }

  render() {
      return (
          <>
            <button type="button" onClick={ this.battleStart }> BATTLE! </button>

          </>
    );
  }
}

// BattleMenu.propTypes = {
//   Warrior: PropTypes.string.isRequired,
//   Mage: PropTypes.string.isRequired,
//   RandEnemy: PropTypes.string.isRequired,
// }