const paladinTurn = (char, targetedEnemy, teamStat) => {
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

module.exports = {
  paladinTurn,
}