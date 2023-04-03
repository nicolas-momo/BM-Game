const warriorTurn = (char, targetedEnemy, warriorBattleStats) => {
  let damage = Math.floor((char.dmg + char.stat  ) / 1.5);
  let totalDmg = 0;
  if (warriorBattleStats.totalDmg) {
    totalDmg = warriorBattleStats.totalDmg;
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
  
    default: damage = Math.floor((char.dmg + char.stat  ) / 1.5);
      break;
  }
  targetedEnemy.hp = targetedEnemy.hp - damage;
  if (targetedEnemy.hp <= 0) { char.hp = char.hp + Math.floor(char.maxHp / 4) }
  if (char.hp > char.maxHp) { char.hp = char.maxHp }
  totalDmg = totalDmg + damage;
  return { totalDmg }
}

module.exports = {
  warriorTurn,
}