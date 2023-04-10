const allyData = {
    baseTeam: [
    {
      id: 0,
      classe: 'Warrior',
      hp: 150,
      stat: 5,
      mp: 0,
      dmg: 2,
      speed: 10,
      exp: 0,
      counter: 0,
      weight: 3,
      maxHp: 150,
      maxMp: 100,
      lvl: 1,
      skills: [],
      name: 'Aurythor',
    },
    {
      id: 1,
      classe: 'Mage',
      hp: 100,
      stat: 5,
      mp: 50,
      dmg: 0,
      speed: 7,
      exp: 0,
      counter: 0,
      weight: 2,
      maxHp: 100,
      maxMp: 50,
      lvl: 1,
      skills: [],
      name: 'Maeliora',
    },
    {
      id: 2,
      classe: 'Paladin',
      hp: 200,
      stat: 5,
      mp: 50,
      dmg: 0,
      speed: 5,
      exp: 0,
      counter: 0,
      weight: 4,
      maxHp: 200,
      maxMp: 50,
      healPower: 0,
      lvl: 1,
      skills: [],
      name: 'Wynfir',
    },
  ],
  baseChars: [
  {
    classe: 'Warrior',
    hp: 150,
    stat: 5,
    mp: 0,
    dmg: 2,
    speed: 10,
    exp: 0,
    counter: 0,
    weight: 3,
    maxHp: 150,
    maxMp: 0,
    lvl: 1,
    skills: [],
  },
  {
    classe: 'Mage',
    hp: 100,
    stat: 5,
    mp: 50,
    dmg: 0,
    speed: 7,
    exp: 0,
    counter: 0,
    weight: 2,
    maxHp: 100,
    maxMp: 50,
    lvl: 1,
    skills: [],
  },
  {
    classe: 'Paladin',
    hp: 200,
    stat: 5,
    mp: 50,
    dmg: 0,
    speed: 5,
    exp: 0,
    counter: 0,
    weight: 4,
    maxHp: 200,
    maxMp: 50,
    lvl: 1,
    skills: [],
  },
  ],
}

const generateFantasyName = () => {
  const prefixes = ['El', 'Ar', 'Gal', 'Eri', 'Thal', 'Ara', 'Nim', 'Lor', 'Cael',
    'Dra', 'Fae','Gwyn', 'Rhi', 'Myth', 'Kael', 'Mael', 'Syl', 'Nia', 'Aur', 'Lune',
    'Ael', 'Aur', 'Eil', 'Eol', 'Eri', 'Ili', 'Ori', 'Ova', 'Ula', 'Ume', 'Yla', 'Yri'];

  const suffixes = ['dor', 'dan', 'ion', 'iel', 'in', 'orin', 'wyn', 'thor', 'fyr',
    'lyn','sia', 'ara', 'yne', 'on', 'wynn', 'thys', 'vael', 'rya', 'ionel', 'irin',
    'ael', 'ara', 'eri', 'ielle', 'ilyn', 'ine', 'irel', 'ora', 'orne', 'ova'];

  const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

  const prefixIndex = Math.floor(Math.random() * prefixes.length);
  const suffixIndex = Math.floor(Math.random() * suffixes.length);
  const vowelIndex = Math.floor(Math.random() * vowels.length);

  const name = prefixes[prefixIndex] + vowels[vowelIndex] + suffixes[suffixIndex];
  return name;
}



module.exports = { allyData, generateFantasyName } ;