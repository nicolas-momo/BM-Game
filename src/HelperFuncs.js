const { enemyData } = require("./Data");

const shrinkNum = (value) => {
  value = String(value);

  if (!isNaN(value)) {
    const valueInt = parseInt(value);

    if (valueInt > 1000000) {
      value = `${(valueInt / 1000000.00).toFixed(1)}M`;
    } else {
      if (valueInt > 1000) {
        value = `${(valueInt / 1000.0).toFixed(1)}k`;
      }
    }
  }
  return value;
}

const createEnemies = (currentFloor) => {
  const enemyList = enemyData;
  const enemyQty = 3;
  const randEnemies = [];
  for (let i = 0; i < enemyQty; i += 1) {
    const id = Math.floor(Math.random() * enemyList.length);
    const enemyType = enemyList[id];
    const newMaxHp = Math.floor((Math.random() * (enemyType.hpMax - enemyType.hpMin + 1) * (Math.pow(1.12, currentFloor)) / currentFloor) + (enemyType.hpMin * (Math.pow(1.10, currentFloor))));
    const newMaxMp = Math.floor((Math.random() * (enemyType.mpMax - enemyType.mpMin + 1) * (Math.pow(1.12, currentFloor)) / currentFloor) + (enemyType.mpMin * (Math.pow(1.10, currentFloor))));
    const newStat = Math.floor((Math.random() * (enemyType.statMax - enemyType.statMin + 1) * (Math.pow(1.12, currentFloor)) / currentFloor) + (enemyType.statMin * (Math.pow(1.10, currentFloor))));
    const newDmg = Math.floor((Math.random() * (enemyType.dmgMax - enemyType.dmgMin + 1) * (Math.pow(1.12, currentFloor)) / currentFloor) + (enemyType.dmgMin * (Math.pow(1.10, currentFloor))));
    const newSpeed = Math.floor((Math.random() * (enemyType.speedMax - enemyType.speedMin + 1) * (Math.pow(1.11, currentFloor)) / currentFloor) + (enemyType.speedMin * (Math.pow(1.09, currentFloor))));
    let enemy = {
      id: randEnemies.length,
      name: enemyType.name,
      classe: 'enemy',
      hp: newMaxHp,
      maxHp: newMaxHp,
      mp: newMaxMp,
      maxMp: newMaxMp,
      stat: newStat,
      dmg: newDmg,
      speed: newSpeed,
      weight: enemyType.weight,
      image: enemyType.image,
    };
    randEnemies.push(enemy);
  }
  return randEnemies;
}

const getTargetByWeight = (validTargets) => {
  const weightedChars = [];
  validTargets.forEach((char) => {
    for (let i = 0; i < char.weight; i += 1) {
      weightedChars.push(char);
    }
  });
  const index = Math.floor(Math.random() * weightedChars.length);
  const targetedEnemy = weightedChars[index];
  return targetedEnemy
}


module.exports = {
  shrinkNum,
  createEnemies,
  getTargetByWeight,
}