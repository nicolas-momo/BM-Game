const paladinTurn = (char, targetedEnemy, teamStat, paladinBattleStats) => {
  const baseDmg = Math.floor((char.dmg + char.stat  ) / 1.5);
  const baseHeal = (char.stat * 4) + (char.maxHp / 10)
  let damage = baseDmg;
  let heal = 0;
  let totalDmg = 0;
  let totalHeal = 0;
  if (paladinBattleStats.totalDmg) {
    totalDmg = paladinBattleStats.totalDmg;
  }
  if (paladinBattleStats.totalHeal) {
    totalHeal = paladinBattleStats.totalHeal;
  }
  const validTargets = teamStat.filter((hero) => hero.hp > 0);
  const lowestHp = validTargets.reduce((prev, curr) => {
    return (prev.maxHp - prev.hp) > (curr.maxHp - curr.hp) ? prev : curr;
   }, []);
  char.counter = char.counter + 1;
  switch (char.counter) {
    // skill finder em array -> prep para shop
    case 2: if (char.skills.find((skill) => skill === 'minorHeal')) damage = minorHeal(char, lowestHp, baseHeal, baseDmg)
      break;

    case 3: if (char.skills.find((skill) => skill === 'holyDamage')) damage = holyDamage(baseDmg);
      break;

    case 4:  if (char.skills.find((skill) => skill === 'normalHeal')) damage = normalHeal(char, lowestHp, baseHeal, baseDmg)
      break;

    case 5: if (char.skills.find((skill) => skill === 'smite')) damage = smite(baseDmg);
      break;

    case 6: if (char.skills.find((skill) => skill === 'greaterHeal')) damage = greaterHeal(char, lowestHp, baseHeal, baseDmg, validTargets)
      break;

    default: damage = baseDmg;
      break;
    }
  targetedEnemy.hp = targetedEnemy.hp - damage;
  if (targetedEnemy.hp <= 0) { Math.floor(char.mp = char.mp + Math.floor(char.maxMp / 8)) }
  totalDmg = totalDmg + damage;
  totalHeal = totalHeal + heal;
  return { totalDmg, totalHeal } 
}

const minorHeal = (char, lowestHp, baseHeal, baseDmg) => {
  if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
    if (char.mp >= 10) {
      let heal = baseHeal; 
      char.mp = char.mp - 10;
      lowestHp.hp = lowestHp.hp + heal;
      if (lowestHp.hp > lowestHp.maxHp) {
        lowestHp.hp = lowestHp.maxHp;
      }
    } else { Math.floor(char.mp = char.mp + Math.floor(char.maxMp / 10)) }
    return 0;
  } return baseDmg;
}

const normalHeal = (char, lowestHp, baseHeal, baseDmg) => {
  if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
    if (char.mp >= 15) {
      let heal = baseHeal; 
      heal = baseHeal * 2;
      char.mp = char.mp - 15;
      lowestHp.hp = lowestHp.hp + heal;
      if (lowestHp.hp > lowestHp.maxHp) {
        lowestHp.hp = lowestHp.maxHp 
      } 
    } else { Math.floor(char.mp = char.mp + Math.floor(char.maxMp / 10)) }
    return 0;
  } return baseDmg;
}

const greaterHeal = (char, lowestHp, baseHeal, baseDmg, validTargets) => {
  if (lowestHp.maxHp !== lowestHp.hp) { // tem alguem precisando de cura
    if (char.mp >= 20) {
      let heal = baseHeal; 
      heal = Math.floor(baseHeal * 1.5);
      char.mp = char.mp - 20;
      validTargets.forEach((hero) => {
        hero.hp = hero.hp + heal;
        if (hero.hp > hero.maxHp) { hero.hp = hero.maxHp }
      })} else { Math.floor(char.mp = char.mp + Math.floor(char.maxMp / 20)) }
      return 0;
    } char.counter = 0;
    return baseDmg; 
}

const holyDamage = (baseDmg) => {
  return Math.ceil(baseDmg * 1.3);
}

const smite = (baseDmg) => {
  return Math.ceil(baseDmg * 2);
}

module.exports = {
  paladinTurn,
}