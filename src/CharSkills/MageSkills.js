/* eslint-disable no-unused-vars */
const mageTurn = (char, targetedEnemy, turnResult, _teamList) => {
  const base = Math.floor((char.stat + char.dmg )/ 1.5);
  let damage = base;
  let totalDmg = 0;
  if (turnResult) {
    totalDmg = turnResult.totalDmg;
  }
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
  
    default: char.mp = Math.floor(char.mp + char.maxMp/10);
      break;
  }
  targetedEnemy.hp = targetedEnemy.hp - damage;
  if (targetedEnemy.hp <= 0) { char.mp = char.mp + 100 }
  if (char.mp > char.maxMp) char.mp = char.maxMp;
  totalDmg = totalDmg + damage;
  return { id: char.id, totalDmg }
}

module.exports = mageTurn;