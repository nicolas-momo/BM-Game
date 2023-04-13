/* eslint-disable no-unused-vars */
const warriorTurn = (char, targetedEnemy, turnResult, _teamList ) => {
  const baseDmg = Math.floor((char.dmg) + (char.stat / 1.5));
  let damage = baseDmg;
  let totalDmg = 0;
  if (turnResult) {
    totalDmg = turnResult.totalDmg;
  }
  char.counter = char.counter + 1;

  switch (char.counter) {
    case 3: damage = 10;
      break;

    case 5: damage = 15;
      break;

    case 7: damage = 20;
       char.counter = 0;
      break;
  
    default: damage = baseDmg;
      char.mp = char.mp + 5;
      break;
  }
  if (char.mp > char.maxMp) char.mp = char.maxMp;
  if (targetedEnemy.hp > 0) {
    targetedEnemy.hp = targetedEnemy.hp - damage;
  }
  if (targetedEnemy.hp <= 0) { char.hp = char.hp + Math.floor(char.maxHp / 4) }
  if (char.hp > char.maxHp) { char.hp = char.maxHp }
  totalDmg = totalDmg + damage;
  return { id: char.id, totalDmg }
}

module.exports = warriorTurn;