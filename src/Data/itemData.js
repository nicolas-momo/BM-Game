const itemData = [
  {
    id: 0,
    name: 'Staff of Healing',
    amount: '25',
    operation: 'ADD',
    effect:'heal',
    description: 'Increases healing done by 25%.',
    cost:'150'
  },
  {
    id: 1,
    name: 'Cape of Thunder',
    amount: '1.2',
    operation: 'X',
    effect: 'intelligence',
    description: 'Increases Intelligence by 20%.',
    cost:'250'
  },
  {
    id: 2,
    name: 'Sword of Fire',
    amount: '8',
    operation: 'ADD',
    effect:'attack',
    description: 'Increases Attack by 8.',
    cost:'125'
  },
  {
    id: 4,
    name: 'Sword of Ice',
    amount: '6',
    operation: 'ADD',
    effect:'attack',
    description: 'Increases Attack by 6.',
    cost:'80'
  },
  {
    id: 5,
    name: 'Amulet of Health',
    amount: '1.5',
    operation: 'X',
    effect:'health',
    description: 'Increases max health by 50%.',
    cost:'350'
  },
  {
    id: 6,
    name: 'Hat of the Undead',
    amount: '1.15',
    operation: 'X',
    effect:'health',
    description: 'Increases HP by 15%.',
    cost:'150'
  },
  {
    id: 7,
    name: 'Helm of the Dragon',
    amount: '1.2',
    operation: 'X',
    effect:'strength',
    description: 'Increases Strength by 20%.',
    cost:'150'
  },
  {
    id: 8,
    name: 'Orb of Nature',
    amount: '1.2',
    operation: 'X',
    effect:'mana',
    description: 'Increases MP by 20%.',
    cost:'220'
  },
  {
    id: 9,
    name: 'Boots of Haste',
    amount: '1.25',
    operation: 'X',
    effect:'speed',
    description: 'Increases Speed by 25%.',
    cost:'325'
  },
  {
    id: 12,
    name: 'Book of the Dragon Slayer',
    amount: '10',
    operation: 'ADD',
    effect:'magic',
    description: 'Magic attacks 10 extra damage.',
    cost:'120'
  },
  {
    id: 13,
    name: 'Boots of Stealth',
    amount: '0.5',
    operation: 'X',
    effect:'weight',
    description: 'Decreases chance to be targeted.',
    cost:'1000'
  },
  {
    id: 14,
    name: 'Helm of Light',
    amount: '1.2',
    operation: 'X',
    effect:'faith',
    description: 'Increases Faith by 20%.',
    cost:'250',
    slot:'hat',
  },
]

const applyItem = (char, item) => {
  let updatedChar = { ...char };
  const slot = char.inventory.find((equipped) => equipped.slot === item.slot)
  if (slot) return
  switch (item.effect) {
    case 'heal':
      if(char.classe === 'Paladin') {
         if (item.operation === 'ADD') {
          updatedChar.healPower += item.amount;
        }
      }
      break;
    case 'faith':
      if(char.classe === 'Paladin') {
        if (item.operation === 'X') {
          updatedChar.stat = Math.ceil(updatedChar.stat * item.amount);
        } else if (item.operation === 'ADD') {
          updatedChar.stat += item.amount;
        }
      }
      break;
    case 'intelligence':
      if(char.classe === 'Mage') {
        if (item.operation === 'X') {
          updatedChar.stat = Math.ceil(updatedChar.stat * item.amount);
        } else if (item.operation === 'ADD') {
          updatedChar.stat += item.amount;
        }
      }
      break;
    case 'magic':
      if(char.classe === 'Mage') {
        if (item.operation === 'X') {
          updatedChar.dmg = Math.ceil(updatedChar.dmg * item.amount);
        } else if (item.operation === 'ADD') {
          updatedChar.dmg += item.amount;
        }
      }
      break;
    case 'attack':
      if (item.operation === 'X') {
        updatedChar.dmg = Math.ceil(updatedChar.dmg * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.dmg += item.amount;
      }
      break;
    case 'strength':
      if (item.operation === 'X') {
        updatedChar.stat = Math.ceil(updatedChar.stat * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.stat += item.amount;
      }
      break;
    case 'health':
      if (item.operation === 'X') {
        updatedChar.hp = Math.ceil(updatedChar.hp * item.amount);
        updatedChar.maxHp = Math.ceil(updatedChar.maxHp * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.hp += item.amount;
        updatedChar.maxHp += item.amount;
      }
      break;
    case 'mana':
      if (item.operation === 'X') {
        updatedChar.mp = Math.ceil(updatedChar.mp * item.amount);
        updatedChar.maxMp = Math.ceil(updatedChar.maxMp * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.mp += item.amount;
        updatedChar.maxMp += item.amount;
      }
      break;
    case 'speed':
      if (item.operation === 'X') {
        updatedChar.speed = Math.ceil(updatedChar.speed * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.speed += item.amount;
      }
      break;
    case 'weight':
      if (item.operation === 'X') {
        updatedChar.weight = Math.ceil(updatedChar.weight * item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.weight += item.amount;
      }
      break;
    default:
      break;
  }

  return updatedChar;
};

const removeItem = (char, item) => {
  let updatedChar = { ...char };

  switch (item.effect) {
    case 'heal':
      if(char.classe === 'Paladin') {
         if (item.operation === 'ADD') {
          updatedChar.healPower -= item.amount;
        }
      }
      break;
    case 'intelligence':
      if(char.classe === 'Mage') {
        if (item.operation === 'X') {
          updatedChar.stat = Math.floor(updatedChar.stat / item.amount);
        } else if (item.operation === 'ADD') {
          updatedChar.stat -= item.amount;
        }
      }
      break;
    case 'magic':
      if(char.classe === 'Mage') {
        if (item.operation === 'X') {
          updatedChar.dmg = Math.floor(updatedChar.dmg / item.amount);
        } else if (item.operation === 'ADD') {
          updatedChar.dmg -= item.amount;
        }
      }
      break;
    case 'attack':
      if (item.operation === 'X') {
        updatedChar.dmg = Math.floor(updatedChar.dmg / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.dmg -= item.amount;
      }
      break;
    case 'strength':
      if (item.operation === 'X') {
        updatedChar.stat = Math.floor(updatedChar.stat / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.stat -= item.amount;
      }
      break;
    case 'health':
      if (item.operation === 'X') {
        updatedChar.hp = Math.floor(updatedChar.hp / item.amount);
        updatedChar.maxHp = Math.floor(updatedChar.maxHp / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.hp -= item.amount;
        updatedChar.maxHp -= item.amount;
      }
      break;
    case 'mana':
      if (item.operation === 'X') {
        updatedChar.mp = Math.floor(updatedChar.mp / item.amount);
        updatedChar.maxMp = Math.floor(updatedChar.maxMp / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.mp -= item.amount;
        updatedChar.maxMp -= item.amount;
      }
      break;
    case 'speed':
      if (item.operation === 'X') {
        updatedChar.speed = Math.floor(updatedChar.speed / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.speed -= item.amount;
      }
      break;
    case 'weight':
      if (item.operation === 'X') {
        updatedChar.weight = Math.floor(updatedChar.weight / item.amount);
      } else if (item.operation === 'ADD') {
        updatedChar.weight -= item.amount;
      }
      break;
    default:
      break;
  }

  return updatedChar;
};


module.exports = { itemData, applyItem, removeItem } ;